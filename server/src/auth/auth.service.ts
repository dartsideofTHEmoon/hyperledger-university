import * as jwt from 'jsonwebtoken';
import {Injectable} from '@nestjs/common'
import {UserInfo} from "./interfaces/user.info";
import {formatUserId, JwtPayload} from "./interfaces/jwt.payload";

@Injectable()
export class AuthService {
    constructor() {}

    get encryptionKey() {
        //Normally we take encryption key from outside of app (env params, AWS parameter store etc.)
        return "EXAMPLE_ENCRYPTION_KEY"
    }

    createToken(userInfo: UserInfo) {
        const subject = formatUserId(userInfo.userId);
        const user: JwtPayload = { sub: subject };
        return jwt.sign(user, this.encryptionKey, {
            expiresIn: "2h"
        });
    }

    async validateAccount(userInfo: UserInfo): Promise<UserInfo | null> {
        //Perform user validation
        return userInfo
    }
}
