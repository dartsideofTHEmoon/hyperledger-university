import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { ConfigModule } from "../config";
import {FabricModule} from "../fabric/fabric.module";

@Module({
    imports: [ConfigModule, UserModule, FabricModule],
    providers: [JwtStrategy, AuthService],
    exports:[AuthService],
    controllers: [AuthController]
})
export class AuthModule {
}
