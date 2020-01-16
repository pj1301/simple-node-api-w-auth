import { mongodb } from '../services/mongo.service';
import { ObjectId } from 'mongodb';

export async function findUser(userData: any) {
  const { username } = userData;
  const result = await mongodb.findRecord({ username }, 'users');
  return result;
}

export function createUserIDQuery(id: string) {
  return { _id: new ObjectId(id) };
} 
