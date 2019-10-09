import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {AuthService} from './auth.service'
import {JwtPayload} from "./interfaces/jwt.payload";
import {UserInfo} from "./interfaces/user.info";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: authService.encryptionKey,
        });
    }

    private parseUserId(payload: JwtPayload) {
        const sub = payload.sub
        return sub.replace(/^aid:/, '');
    }

    public async validate(payload: JwtPayload, done: (err: Error | null, result: UserInfo | null) => void) {
        const userId = this.parseUserId(payload);
        const user = await this.authService.validateAccount({ userId: userId });
        if (!user) {
            return done(new UnauthorizedException(), null);
        }
        done(null, user);
    }
}
