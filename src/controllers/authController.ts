import express, { Request, Response } from 'express';
import { mongodb } from '../services/mongo.service';
import { encryption } from '../services/encryption.service';
import { validate } from '../services/jwt.service';
import { findUser } from '../core/user_functions';

const authRoutes = express.Router();

authRoutes.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (await findUser({username})) return res.send('User already exists');
  const record = { username, password: await encryption.encrypt(password) };
  const result: any = await mongodb.createRecord(record, 'users');
  res.send(result ? 'User created' : 'An error occurred');
})

authRoutes.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await findUser({ username });
  if (!user) return res.send('User credentials incorrect');
  if (await encryption.decrypt(user, password)) {
    const token = validate.issueToken({ id: user._id });
    return res.send(token);
  }
  return res.send('User credentials incorrect');
})

export { authRoutes };
