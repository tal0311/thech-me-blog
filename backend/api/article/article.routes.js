import express from 'express'

import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'

import { getArticles, getArticleById, addArticle, updateArticle, removeArticle, addArticleComment, removeArticleComment } from './article.controller.js'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', log, getArticles)
router.get('/:id', log, getArticleById)
// router.post('/', log, requireAuth, addArticle)
router.post('/', log, addArticle)
// router.put('/:id', requireAuth, updateArticle)
router.put('/:id',  updateArticle)
router.delete('/:id', removeArticle)
// router.delete('/:id', requireAuth, requireAdmin, removeArticle)

router.post('/:id/comment', requireAuth, addArticleComment)
router.delete('/:id/comment/:commentId', requireAuth, removeArticleComment)

export const articleRoutes = router