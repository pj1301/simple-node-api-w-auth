import Debug from 'debug';
import { MongoClient, ObjectId } from 'mongodb';

const debug = Debug('app:mongo.service');
const url = 'mongodb://localhost:27017';
const mongodOpt = { useNewUrlParser: true, useUnifiedTopology: true };
const dbName = 'myTestDb';

export class MongoDB {
  
  public async createRecord(data: any, collectionName: string) {
    const client = await MongoClient.connect(url, mongodOpt).catch((error) => debug(error));
    if (!client) return false;
    let result;
    try {
      result = await client.db(dbName).collection(collectionName).insertOne(data);
    } catch (error) {
      return debug(error);
    } 
    return result;
  }

  public async findRecord(query: any, collectionName: string) {
    const client = await MongoClient.connect(url, mongodOpt).catch((error) => {debug(error)});
    if (!client) return false;
    let result;
    try {
      result = await client.db(dbName).collection(collectionName).findOne(query);
    } catch (error) {
      debug(error);
    }
    return result;
  } 

}