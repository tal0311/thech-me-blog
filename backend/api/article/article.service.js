import { logger } from '../../services/logger.service.js'
import { makeId } from '../../services/util.service.js'
import { dbService } from '../../services/db.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'

const PAGE_SIZE = 3

export const articleService = {
	remove,
	query,
	getById,
	add,
	update,
	addArticleComment,
	removeArticleComment,
}

async function query(filterBy = { txt: '' }) {

	console.log('FILTER IN SERVICE:',filterBy);


	try {

		
	
		const criteria = _buildCriteria(filterBy)
		const collection = await dbService.getCollection('article')

		

		var articleCursor = await collection.aggregate([
			{ $match: criteria },
			{
				$project: {
					[`title.${filterBy.lang}`]: 0,
					[`description.${filterBy.lang}`]: 0,
					[`articleUrl.${filterBy.lang}`]: 0,
					[`tags.${filterBy.lang}`]: 0
				}
			},
			{
				$addFields: {
					publishedAt: { $toDate: "$_id" },
					isSelected: false,
					totalComments: { $sum: { $size: "$comments" } },
					approvedComments: {
						$size: {
							$filter: {
								input: "$comments",
								as: "comment",
								cond: { $eq: ["$$comment.isApproved", true] }
							}
						}
					}
				}
			},
		])

		if (filterBy.pageIdx !== undefined) {
			articleCursor.skip(filterBy.pageIdx * PAGE_SIZE).limit(PAGE_SIZE)
		}

		const articles = articleCursor.toArray()

		return articles
	} catch (err) {
		logger.error('cannot find articles', err)
		throw err
	}
}

async function getById(slug) {
	try {
		
		const criteria = { slug , isPublished: true }

		const collection = await dbService.getCollection('article')
		const article = await collection.findOne(criteria)

		if (!article) {
			const err = new Error('Article not found')
			err.status = 404
			throw err
		}


		article.publishedAt = article._id.getTimestamp()
		return article

	} catch (err) {
		logger.error(`while finding article with slug ${slug}`, err)
		throw err
	}
}


async function remove(articleId) {
	try {
		const criteria = {
			_id: dbService.mongoID(articleId),
		}


		const collection = await dbService.getCollection('article')
		const res = await collection.deleteOne(criteria)

		if (res.deletedCount === 0) throw ('Not your article')
		return articleId
	} catch (err) {
		logger.error(`cannot remove article ${articleId}`, err)
		throw err
	}
}

async function add(article) {
	try {

		const allowedFields = ['title', 'description', 'articleUrl', 'tags', 'isPublished', 'author', 'slug',]

		// {
		// 	"_id": "6813b86203d2e2856ffe8017",
		// 	"slug": "rate-limiter",
		// 	"title": {
		// 		"he": "תן גז לשרת, לא להאקרים",
		// 		"en": "Throttle the Hacker, Not the Server"
		// 	},
		// 	"description": {
		// 		"he": "מדריך אמיתי ל-Rate Limiting עם פרקטיקה והומור",
		// 		"en": "A practical and witty guide to Rate Limiting"
		// 	},
		// 	"articleUrl": {
		// 		"he": "https://tal0311.github.io/Tech-Me/HTML/rate-limiter-he.html",
		// 		"en": "https://tal0311.github.io/Tech-Me/HTML/rate-limiter-en.html"
		// 	},
		// 	"tags": {
		// 		"he": [
		// 			"אבטחה",
		// 			"Node.js",
		// 			"שרתים"
		// 		],
		// 		"en": [
		// 			"security",
		// 			"nodejs",
		// 			"backend"
		// 		]
		// 	},
		// 	"isPublished": true,
		// 	"author": {
		// 		"name": "טל",
		// 		"email": "tal@example.com"
		// 	},
		// 	"updatedAt": null,
		// 	"comments": [
		// 		{
		// 			"commentId": "cmt_001",
		// 			"name": "שירה לוי",
		// 			"content": "מאמר מעולה! אהבתי את ההסבר על תוקפים שמנצלים Rate Limit גלובלי.",
		// 			"createdAt": "2024-05-01T17:40:00.000Z",
		// 			"isApproved": true
		// 		},
		// 		{
		// 			"commentId": "cmt_002",
		// 			"name": "Yossi",
		// 			"content": "אפשר דוגמה עם Redis גם?",
		// 			"createdAt": "2024-05-01T17:50:00.000Z",
		// 			"isApproved": false
		// 		}
		// 	],
		// 	"publishedAt": "2025-05-01T18:07:30.000Z"
		// }
		const collection = await dbService.getCollection('article')
		await collection.insertOne(article)

		return article
	} catch (err) {
		logger.error('cannot insert article', err)
		throw err
	}
}

async function update(body) {

	const allowedFields = ['title', 'description', 'articleUrl', 'tags', 'isPublished', 'author', 'slug',]

	const { _id, ...article } = body

	const articleToSave = allowedFields.reduce((acc, field) => {
		if (field in article) {
			acc[field] = article[field]
		}
		return acc
	}, {})
	try {
		const criteria = { _id: dbService.mongoID(_id) }

		const collection = await dbService.getCollection('article')
		await collection.updateOne(criteria, { $set: articleToSave })

		return article
	} catch (err) {
		logger.error(`cannot update article ${article._id}`, err)
		throw err
	}
}

async function addArticleComment(articleId, comment) {
	try {
		const criteria = { _id: dbService.mongoID(articleId) }
		comment.id = makeId()

		const collection = await dbService.getCollection('article')
		await collection.updateOne(criteria, { $push: { comments: comment } })

		return comment
	} catch (err) {
		logger.error(`cannot add article msg ${articleId}`, err)
		throw err
	}
}

async function removeArticleComment(articleId, commentId) {
	try {
		const criteria = { _id: dbService.mongoID(articleId) }

		const collection = await dbService.getCollection('article')
		await collection.updateOne(criteria, { $pull: { comments: { id: commentId } } })

		return commentId
	} catch (err) {
		logger.error(`cannot remove article msg ${articleId}`, err)
		throw err
	}
}

function _buildCriteria(filterBy) {
	const regex = new RegExp(filterBy.txt, 'i')

	return {
		$or: [
			{ 'title.he': { $regex: regex } },
			{ 'title.en': { $regex: regex } },
			{ 'description.he': { $regex: regex } },
			{ 'description.en': { $regex: regex } },
			{ slug: { $regex: regex } },
			{ 'tags.he': { $elemMatch: { $regex: regex } } },
			{ 'tags.en': { $elemMatch: { $regex: regex } } }
		]
	}
}

