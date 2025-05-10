import { subService } from './sub.service.js'
import { logger } from '../../services/logger.service.js'
import { socketService } from '../../services/socket.service.js'

export async function getSub(req, res) {
    try {
        const sub = await subService.getById(req.params.id)
        res.send(sub)
    } catch (err) {
        logger.error('Failed to get sub', err)
        res.status(400).send({ err: 'Failed to get sub' })
    }
}

export async function getSubs(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
            minBalance: +req.query?.minBalance || 0
        }
        const subs = await subService.query(filterBy)
        res.send(subs)
    } catch (err) {
        logger.error('Failed to get subs', err)
        res.status(400).send({ err: 'Failed to get subs' })
    }
}

export async function deleteSub(req, res) {
    try {
        await subService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete sub', err)
        res.status(400).send({ err: 'Failed to delete sub' })
    }
}

export async function updateSub(req, res) {
    try {
        const sub = req.body
        console.log('sub', sub);
        
        const savedSub = await subService.update(sub)
        res.send(savedSub)
    } catch (err) {
        logger.error('Failed to update sub', err)
        res.status(400).send({ err: 'Failed to update sub' })
    }
}

export async function unSubscribe(req, res) {
    const email = req.validatedEmail;
    logger.debug('Unsubscribing email:', email)
    try {
        const unsubscribed = await subService.unSubscribe(email)
        // notify admin
        res.send(unsubscribed)
    } catch (err) {
        logger.error('Failed to unsubscribe', err)
        res.status(400).send({ err: 'Failed to unsubscribe' })
    }

}


