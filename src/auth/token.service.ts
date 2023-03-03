import * as jwt from 'jsonwebtoken';
import { TokenUser } from '../commons';
import { config } from '../config';
import { JwtPayload } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { computeExpiryDate } from "../commons";

@Injectable()
export class TokenService {
  getTokenInfo(userDetails: TokenUser) {
    const accessToken = this.generateAccessToken(userDetails);
    const refreshToken = this.generateRefreshToken(userDetails);
    const accessTokenExpiresAt = computeExpiryDate(
      parseInt(config.jwt.access.lifeSpan),
    ).toISOString();
    const refreshTokenExpiresAt = computeExpiryDate(
      parseInt(config.jwt.refreshToken.lifeSpan),
    ).toISOString();

    return [
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    ];
  }

  generateAccessToken(userDetails: TokenUser): string {
    return jwt.sign(userDetails, config.jwt.access.secret, {
      expiresIn: config.jwt.access.lifeSpan,
    });
  }
  verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, config.jwt.access.secret) as JwtPayload;
  }

  generateRefreshToken(userDetails: TokenUser) {
    return jwt.sign(userDetails, config.jwt.refreshToken.secret, {
      expiresIn: config.jwt.refreshToken.lifeSpan,
    });
  }
}
