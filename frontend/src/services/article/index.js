const { DEV, VITE_LOCAL } = import.meta.env
import { getRandomIntInclusive, makeId } from '../util.service'

import { articleService as local } from './article.service.local'
import { articleService as remote } from './article.service.remote'

function getEmptyArticle() {
    return {
        slug: '',
        title: {
            he: '',
            en: ''
        },
        description: {
            he: '',
            en: ''
        },
        articleUrl: {
            he: '',
            en: ''
        },
        tags: {
            he: [],
            en: []
        },
        isPublished: false,
        author: {
            name: '',
            email: ''
        },
        updatedAt: null,
        comments: [], // each: { commentId, name, content, createdAt, isApproved }
    };
}


function getDefaultFilter() {
    return {
        txt: '',
        sortField: '',
        sortDir: '',
        pageIdx: 0,
        pageSize: 10,
        lang: 'he',
        isPublished: true,
        isDraft: false,
        isMyArticles: false,
    }
}

function getEmptyComment({ approved = false } = {}) {
    return {
        commentId: `cmt_${makeId(4)}`,
        name: 'Anonymous',
        content: '',
        createdAt: new Date().toISOString(),
        isApproved: approved
    };
}

const service = VITE_LOCAL === 'true' ? local : remote
export const articleService = { getEmptyArticle, getDefaultFilter, ...service }






























//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.articleService = articleService
