import Debug from 'debug';
import jwt from 'jsonwebtoken';

const debug = Debug('app:jwt.service');
const secret = 'this is a secret';

class Token {

  public issueToken(id: object) {
    const token = jwt.sign(id, secret, { algorithm: 'HS256', expiresIn: '1m' })
    return token;
  }
  
  public validateToken(token: string) {
    const key = token.replace(/Bearer /g, '');
    let decoded
    try {
      decoded = jwt.verify(key, secret);
    } catch(error) {
      return debug(error);
    }
    if (!decoded) return false;
    return decoded;
  }

}

const validate = new Token();
export { validate };
