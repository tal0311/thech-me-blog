import express from 'express'

import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { requireToken } from '../../middlewares/requireToken.middleware.js'

import { getSub, getSubs, deleteSub, updateSub, unSubscribe} from './sub.controller.js'

const router = express.Router()

router.get('/', getSubs)
router.get('/unsubscribe', requireToken, unSubscribe)
router.get('/:id', getSub)
router.put('/:id', updateSub)
router.delete('/:id', requireAuth, requireAdmin, deleteSub)

export const subRoutes = router