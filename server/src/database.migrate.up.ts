import { Module } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { Connection } from "typeorm"
import { ConfigModule } from "./config"
import { DatabaseModule } from "./database/database.module"

@Module({
    imports: [ConfigModule, DatabaseModule],
    exports: []
})
export class AppModule {
    constructor(private readonly connection: Connection) {
        connection
            .runMigrations()
            .then(() => {
                process.exit()
            })
            .catch(err => {
                process.exit(1)
            })
    }
}

async function bootstrap() {
    await NestFactory.create(AppModule, )
}

bootstrap()
