import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { expressjwt as jwt } from 'express-jwt'
import { expressJwtSecret, GetVerificationKey } from 'jwks-rsa';
import {promisify} from 'util'
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthorizationGuard implements CanActivate {


  //code below is from this video - https://www.youtube.com/watch?v=0kS9tEryxLw
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;
  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE');
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN');
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);

    const checkJwt = promisify(jwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`
      }) as GetVerificationKey,
      audience: this.AUTH0_AUDIENCE,
      issuer: this.AUTH0_DOMAIN,
      algorithms: ['RS256']
    }))

    try {
      await checkJwt(req, res);
      return true
    }catch (e) {
      throw new UnauthorizedException(e)
    }
  }
}
