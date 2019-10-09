import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "../database/database.module";
import { User } from "./user.entity";
import {UserService} from "./user.service";

@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([User])],
    providers: [UserService],
    controllers: [],
    exports: [UserService]
})
export class UserModule {
}
