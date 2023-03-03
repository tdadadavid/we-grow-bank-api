import * as bcrypt from 'bcrypt';
import { config } from '../config';
import { Injectable } from "@nestjs/common";

@Injectable()
export class PasswordService {
  encodePassword(value: string): Promise<string> {
    return bcrypt.hash(value, config.saltHash);
  }

  comparePassword(plain: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(plain, encrypted);
  }
}
