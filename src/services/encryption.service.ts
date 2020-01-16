import Debug from 'debug';
import bcrypt from 'bcrypt';

const debug = Debug('app:encryption.service');

export class Encryption {

  public async encrypt(pw: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw, salt).catch((error) => debug(error));
    return hash;
  }

  public async decrypt(userData: any, pw: string) {
    const valid = await bcrypt.compare(pw, userData.password)
    return valid;
  }

}
