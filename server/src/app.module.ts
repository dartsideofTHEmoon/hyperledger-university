import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {DatabaseModule} from "./database/database.module";
import {ConfigModule} from "./config";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth";
import {FabricModule} from "./fabric/fabric.module";
import {CertificateModule} from "./certificate/certificate.module";
import {AdminExists} from "./fabric/adminExists.middleware";

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        UserModule,
        AuthModule,
        FabricModule,
        CertificateModule
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AdminExists)
            .forRoutes('*')
    }
}
