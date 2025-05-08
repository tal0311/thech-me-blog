import { MongoClient , ObjectId} from 'mongodb'

import { config } from '../config/index.js'
import { logger } from './logger.service.js'

const mongoID = ObjectId.createFromHexString
export const dbService = { getCollection  ,mongoID}
var dbConn = null

async function getCollection(collectionName) {
	try {
		const db = await _connect()
		const collection = await db.collection(collectionName)
		return collection
	} catch (err) {
		logger.error('Failed to get Mongo collection', err)
		throw err
	}
}

async function _connect() {
	if (dbConn) return dbConn
    
	try {
		const client = await MongoClient.connect(config.dbURL)
		return dbConn = client.db(config.dbName)
	} catch (err) {
		logger.error('Cannot Connect to DB', err)
		throw err
	}
}