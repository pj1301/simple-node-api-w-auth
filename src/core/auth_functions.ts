import Debug from 'debug';
import { Request, Response, NextFunction } from 'express';
import { validate } from '../services/jwt.service';
import { createUserIDQuery } from './user_functions';
import { mongodb } from '../services/mongo.service';

const debug = Debug('app:auth_functions');

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) return res.send('Not authorised');
  const userId = await checkHeader(req, res);
  if (!userId) return res.send('Token invalid');
  const query = createUserIDQuery(userId);
  await mongodb.findRecord(query, 'users') ? next() : res.send('Not authorised');
}

async function checkHeader(req: Request, res: Response) {
  let token: any = await validate.validateToken(req.headers.authorization);
  if (!token) return debug('token invalid');
  return token.id;
}