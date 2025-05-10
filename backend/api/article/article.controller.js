import { logger } from '../../services/logger.service.js'
import { articleService } from './article.service.js'

export async function getArticles(req, res) {
	try {
		const filterBy = {
			txt: req.query.q || '',
			lang: req.query.lang === 'en' ? 'he' : 'en',
			pageIdx: parseInt(req.query.pageIdx) || 0,
		}

		const articles = await articleService.query(filterBy)
		res.json(articles)
	} catch (err) {
		logger.error('Failed to get articles', err)
		res.status(400).send({ err: 'Failed to get articles' })
	}
}

export async function getArticleById(req, res) {
	try {
		const { slug } = req.params
		const article = await articleService.getById(slug)
		res.json(article)
	} catch (err) {
		logger.error('Failed to get article', JSON.stringify(err))
		res.status(err.status).send({ err: 'Failed to get article' })
	}
}

export async function addArticle(req, res) {
	const { loggedInUser = { "name": "טל", "email": "tal@example22.com" }, body: article } = req

	try {
		article.author = loggedInUser
		const addedArticle = await articleService.add(article)
		res.json(addedArticle)
	} catch (err) {
		logger.error('Failed to add article', err)
		res.status(401).send({ err: 'Failed to add article' })
	}
}

export async function updateArticle(req, res) {
	const { loggedInUser, body: article } = req
	// const { _id: userId, isAdmin } = loggedInUser

	// use middleware
	// if (!isAdmin && article.owner._id !== userId) {
	// 	res.status(403).send('Not your article...')
	// 	return
	// }

	try {
		const updatedArticle = await articleService.update(article)
		res.json(updatedArticle)
	} catch (err) {
		logger.error('Failed to update article', err)
		res.status(400).send({ err: 'Failed to update article' })
	}
}

export async function removeArticle(req, res) {
	try {
		// middle ware foe owner
		const articleId = req.params.id
		const removedId = await articleService.remove(articleId)

		res.send(removedId)
	} catch (err) {
		logger.error('Failed to remove article', err)
		res.status(400).send({ err: 'Failed to remove article' })
	}
}

export async function addArticleComment(req, res) {


	try {
		const articleId = req.params.id
		const comment = {
			txt: req.body.txt,

		}
		const savedMsg = await articleService.addArticleComment(articleId, comment)
		res.json(savedMsg)
	} catch (err) {
		logger.error('Failed to update article', err)
		res.status(400).send({ err: 'Failed to update article' })
	}
}

export async function removeArticleComment(req, res) {
	try {
		const { id: articleId, msgId } = req.params

		const removedId = await articleService.removeArticleMsg(articleId, msgId)
		res.send(removedId)
	} catch (err) {
		logger.error('Failed to remove article msg', err)
		res.status(400).send({ err: 'Failed to remove article msg' })
	}
}
