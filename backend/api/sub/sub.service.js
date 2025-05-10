
import { log } from '../../middlewares/logger.middleware.js'
import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { reviewService } from '../review/review.service.js'
import { ObjectId } from 'mongodb'

export const subService = {
    add, // Create (Signup)
    getById, // Read (Profile page)
    update, // Update (Edit profile)
    remove, // Delete (remove sub)
    query, // List (of subs)
    getBySubname, // Used for Login
    unSubscribe
}

const collectionName = 'subscriber'

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection(collectionName)
        var subs = await collection.find(criteria).toArray()
        subs = subs.map(sub => {
            delete sub.password
            sub.createdAt = sub._id.getTimestamp()
            // Returning fake fresh data
            // sub.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return sub
        })
        return subs
    } catch (err) {
        logger.error('cannot find subs', err)
        throw err
    }
}

async function getById(subId) {
    try {
        let criteria = { _id: dbService.mongoID(subId) }
        logger.debug('criteria', criteria)
        const collection = await dbService.getCollection(collectionName)
        const sub = await collection.findOne(criteria)
        if (!sub) throw new Error('Subscriber not found')

        return sub
    } catch (err) {
        logger.error(`while finding sub by id: ${subId}`, err)
        throw err
    }
}

async function getBySubname(subname) {
    try {
        const collection = await dbService.getCollection(collectionName)
        const sub = await collection.findOne({ subname })
        return sub
    } catch (err) {
        logger.error(`while finding sub by subname: ${subname}`, err)
        throw err
    }
}

async function remove(subId) {
    try {
        const criteria = { _id: ObjectId.createFromHexString(subId) }

        const collection = await dbService.getCollection(collectionName)
        await collection.deleteOne(criteria)
    } catch (err) {
        logger.error(`cannot remove sub ${subId}`, err)
        throw err
    }
}

async function update(sub) {
    try {

        const existing = await getById(sub._id)

        const { _id, ...subToSave } = sub
        const changes = _compareChanges(existing, subToSave);

        const keys = Object.keys(changes);
        const action = keys.length === 1
            ? `updated-${keys[0]}`
            : `updated-multiple: ${keys.join(', ')}`;

        const collection = await dbService.getCollection(collectionName)
        const result = await collection.findOneAndUpdate(
            { _id: dbService.mongoID(_id) },
            {
                $set: {
                    ...subToSave,
                    updatedAt: new Date()
                },
                $push: {
                    updateHistory: {
                        at: new Date(),
                        action,
                        changes
                    }
                }
            },
            { returnDocument: 'after' }
        );
        return result


    } catch (err) {
        logger.error('cannot update sub', err);
        throw err;
    }
}

async function add(sub) {
    const { subname, password } = sub
    const subToSave = {
        subname,
        password,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    try {
        const collection = await dbService.getCollection(collectionName)
        await collection.insertOne(subToSave)
        return subToSave
    } catch (err) {
        logger.error('cannot insert sub', err)
        throw err
    }
}

async function unSubscribe(sub) {

    try {

        const collection = dbService.getCollection(collectionName)

        collection.updateOne(
            { email: sub.email },
            { $set: { isActive: false } }
        )
        return sub
    } catch (error) {
        logger.error('Failed to unsubscribe', error)
        throw error

    }


}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' };
        criteria.$or = [
            {
                subname: txtCriteria,
            },
            {
                fullname: txtCriteria,
            },
        ];
    }
    if (filterBy.minBalance) {
        criteria.score = { $gte: filterBy.minBalance };
    }
    return criteria;
}

export function _compareChanges(oldDoc, newPartial) {
    const changes = {};
    for (const key of Object.keys(newPartial)) {
        const oldVal = oldDoc[key];
        const newVal = newPartial[key];
        if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
            changes[key] = {
                from: oldVal,
                to: newVal
            };
        }
    }
    return changes;
}
