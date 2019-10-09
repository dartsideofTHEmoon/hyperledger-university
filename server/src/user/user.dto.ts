import {IsDefined, IsEmail, IsString} from "class-validator";
import {User} from "./user.entity";

export class UserCredentialsDto {

    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }

    @IsDefined()
    @IsEmail()
    readonly email: string

    @IsDefined()
    @IsString()
    readonly password: string
}

export class AuthUserResponse {

    private id: string

    private email: string

    constructor(user: User) {
        this.id = user.id
        this.email = user.email
    }
}

export class LoginUserResponse {

    token: string

    user: AuthUserResponse

    constructor(token: string, user: User) {
        this.user = new AuthUserResponse(user)
        this.token = token
    }
}