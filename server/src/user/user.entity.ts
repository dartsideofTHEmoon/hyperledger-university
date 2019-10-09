import {Column, Entity, PrimaryColumn} from "typeorm";
import uuid = require("uuid");

@Entity("users")
export class User {

    @PrimaryColumn()
    id: string = uuid();

    @Column({name: "email", type: "text", nullable: false})
    email: string

    @Column({type: "text", nullable: true})
    password: string | null | undefined

    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }

    public async validatePassword(rawPassword: string): Promise<boolean> {
        if (!this.password) {
            return false
        }

        return rawPassword === this.password
    }
}
