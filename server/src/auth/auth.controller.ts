import {Logger, Post, Res, UnauthorizedException, Controller} from "@nestjs/common";
import { Response } from "express";
import {UserCredentialsDto, LoginUserResponse} from "../user/user.dto";
import { UserService } from "../user/user.service";
import { ValidBody } from "../utils/valid.body";
import { AuthService } from "./auth.service";

@Controller("/api/auth")
export class AuthController {

    private readonly logger = new Logger(AuthController.name)

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {
    }

    @Post()
    async login(
        @Res() response: Response,
        @ValidBody() accountCredentials: UserCredentialsDto) {
        const user = await this.userService.findWithCredentials(accountCredentials)
        if (!user) {
            this.logger.warn(`Failed login attempt for ${accountCredentials.email}`)
            throw new UnauthorizedException("Bad credentials.")
        }

        const token = this.authService.createToken({ userId: user.id })
        this.logger.log(`Created token for user with id: ${user.id}`)
        response.send(
            new LoginUserResponse(
                token,
                user
            )

        )
    }

}

