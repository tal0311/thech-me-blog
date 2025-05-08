import { httpService } from '../http.service'

export const articleService = {
    query,
    getById,
    save,
    remove,
    addArticleMsg
}

async function query(filterBy = {}) {
    console.log('filterBy', filterBy);
    
    return httpService.get(`article`, filterBy)
}

function getById(articleId) {
    return httpService.get(`article/${articleId}`)
}

async function remove(articleId) {
    return httpService.delete(`article/${articleId}`)
}

async function save(article) {
    var savedArticle
    if (article._id) {
        savedArticle = await httpService.put(`article/${article._id}`, article)
    } else {
        savedArticle = await httpService.post('article', article)
    }
    return savedArticle
}

async function addArticleMsg(articleId, txt) {
    const savedMsg = await httpService.post(`article/${articleId}/msg`, { txt })
    return savedMsg
}