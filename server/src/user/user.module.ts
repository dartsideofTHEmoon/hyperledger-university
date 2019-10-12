import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "../database/database.module";
import { User } from "./user.entity";
import {UserService} from "./user.service";
import {FabricModule} from "../fabric/fabric.module";

@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([User]), FabricModule],
    providers: [UserService],
    controllers: [],
    exports: [UserService]
})
export class UserModule {
}
