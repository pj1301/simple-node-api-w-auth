import Debug from 'debug';
import express, { Request, Response } from 'express';
import { MongoDB } from '../services/mongo.service';

const authRoutes = express.Router();
const debug = Debug('app:authController');
const mongo = new MongoDB();
const errorMsg = 'An error occurred';

authRoutes.post('/register', async (req: Request, res: Response) => {
  const user = await findUser(req.body);
  if (user) return res.send('User already exists');
  const result = await mongo.createRecord(req.body, 'users');
  res.send(result ? result : errorMsg)
})

authRoutes.post('/login', async (req: Request, res: Response) => {
  const user = await findUser(req.body);
  res.send(user ? user : errorMsg)
})

async function findUser(userData: any) {
  const { username } = userData;
  const result = await mongo.findRecord({ username }, 'users');
  return result;
}

export { authRoutes };
