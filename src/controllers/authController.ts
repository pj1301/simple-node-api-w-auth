import Debug from 'debug';
import express, { Request, Response } from 'express';
import { MongoDB } from '../services/mongo.service';

const authRoutes = express.Router();
const debug = Debug('app:authController');
const mongo = new MongoDB();
const errorMsg = 'An error occurred';

authRoutes.post('/register', async (req: Request, res: Response) => {
  const result = await mongo.createRecord(req.body, 'users');
  res.send(result ? result : errorMsg)
})

authRoutes.post('/login', async (req: any, res: any) => {
  const { username } = req.body;
  const result = await mongo.findRecord({ username }, 'users');
  res.send(result ? result : errorMsg)
})


export { authRoutes };
