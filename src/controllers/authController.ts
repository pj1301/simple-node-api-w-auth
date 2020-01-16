import Debug from 'debug';
import express, { Request, Response } from 'express';
import { MongoDB } from '../services/mongo.service';
import { Encryption } from '../services/encryption.service';

const authRoutes = express.Router();
const debug = Debug('app:authController');
const mongo = new MongoDB();
const errorMsg = 'An error occurred';
const encryption = new Encryption();

authRoutes.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (await findUser({username})) return res.send('User already exists');
  const record = { username, password: await encryption.encrypt(password) };
  const result = await mongo.createRecord(record, 'users');
  res.send(result ? result : errorMsg)
})

authRoutes.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await findUser({ username });
  const authorise = await encryption.decrypt(user, password);
  if (!authorise) return errorMsg;
  const issueToken(user._id)
  res.send(authorise ? user : errorMsg)
})

async function findUser(userData: any) {
  const { username } = userData;
  const result = await mongo.findRecord({ username }, 'users');
  return result;
}

export { authRoutes };
