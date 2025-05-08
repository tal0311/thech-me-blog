
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'article'

export const articleService = {
    query,
    getById,
    save,
    remove,
    addArticleMsg
}
window.cs = articleService


async function query(filterBy = { txt: '', price: 0 }) {
    var articles = await storageService.query(STORAGE_KEY)
    console.log('articles:', articles)
    const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        articles = articles.filter(article => regex.test(article.vendor) || regex.test(article.description))
    }
    if (minSpeed) {
        articles = articles.filter(article => article.speed <= minSpeed)
    }
    if (maxPrice) {
        articles = articles.filter(article => article.price <= maxPrice)
    }
    if (sortField === 'vendor' || sortField === 'owner') {
        articles.sort((article1, article2) =>
            article1[sortField].localeCompare(article2[sortField]) * +sortDir)
    }
    if (sortField === 'price' || sortField === 'speed') {
        articles.sort((article1, article2) =>
            (article1[sortField] - article2[sortField]) * +sortDir)
    }

    articles = articles.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return articles
}

function getById(articleId) {
    return storageService.get(STORAGE_KEY, articleId)
}

async function remove(articleId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, articleId)
}

async function save(article) {
    var savedArticle
    if (article._id) {
        const articleToSave = {
            _id: article._id,
            price: article.price,
            speed: article.speed,
        }
        savedArticle = await storageService.put(STORAGE_KEY, articleToSave)
    } else {
        const articleToSave = {
            vendor: article.vendor,
            price: article.price,
            speed: article.speed,
            // Later, owner is set by the backend
            owner: userService.getloggedInUser(),
            msgs: []
        }
        savedArticle = await storageService.post(STORAGE_KEY, articleToSave)
    }
    return savedArticle
}

async function addArticleMsg(articleId, txt) {
    // Later, this is all done by the backend
    const article = await getById(articleId)

    const msg = {
        id: makeId(),
        by: userService.getloggedInUser(),
        txt
    }
    article.msgs.push(msg)
    await storageService.put(STORAGE_KEY, article)

    return msg
}