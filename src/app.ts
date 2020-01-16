import express, { Request, Response, NextFunction } from 'express';
import Debug from 'debug';
import cors from 'cors';
import { authRoutes } from './controllers/authController';

const debug = Debug('app');
const port = process.env.PORT || 1234;

export class App {
  public app = express();

  public async init() {
    this.app.use(express.json());
    this.app.use(cors({
      methods: 'GET, POST',
      origin: '*',
      preflightContinue: false
    }));
    this.app.use('/auth', authRoutes);
  }
  
  public listen() {
    this.app.listen(port, () => debug(`Listening on port ${port}`))
  }
}
