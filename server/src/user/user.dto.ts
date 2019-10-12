import {IsDefined, IsEmail, IsString} from "class-validator";
import {User} from "./user.entity";
import {Identity} from "fabric-network";

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

    identity: Identity

    constructor(token: string, user: User, identity: Identity) {
        this.user = new AuthUserResponse(user)
        this.token = token
        this.identity = identity
    }
}