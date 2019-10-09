import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {DatabaseModule} from "./database/database.module";
import {ConfigModule} from "./config";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth";

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        UserModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
}
