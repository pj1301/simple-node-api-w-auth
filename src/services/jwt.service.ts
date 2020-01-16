import Debug from 'debug';
import jwt from 'jsonwebtoken';

const debug = Debug('app:jwt.service');

export class Token {

  public issueToken() {
    debug('issuing token');
  }

  public validateToken() {
    debug('validating token');
  }

}