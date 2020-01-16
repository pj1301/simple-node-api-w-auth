import Debug from 'debug';
import express, { Request, Response } from 'express';

const authRoutes = express.Router();
const debug = Debug('app:authController');

authRoutes.post('/register', (req: Request, res: Response): void => {
    res.send('Registering a new user');
  })

authRoutes.post('/login', (req: any, res: any) => {
    res.send('Logging in a user');
  })

export { authRoutes };
