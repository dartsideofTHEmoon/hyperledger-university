import * as path from "path";
import {Global, Module} from "@nestjs/common";
import {memoize} from 'lodash';
import * as fs from "fs";
import {DatabaseConfig, databaseConfigSchema, DatabaseConfigToken} from "./database/database.config"
import {AsyncFactoryProvider, propertyOfProvider} from "./utils/dependency.injection";
import convict = require("convict");

interface EnvConfig {
    deployEnv: "production" | "development" | "staging" | "test" | "test-local"
}

export type AppConfig = EnvConfig & {
    database: DatabaseConfig
};

const configSchema = convict<AppConfig>({
    deployEnv: {
        doc: "The application environment.",
        format: ["production", "development", "staging", "test"],
        default: "development",
        env: "DEPLOY_ENV"
    },
    database: databaseConfigSchema,
});

const loadConfig = memoize(async () => {
    const env: string = configSchema.get('deployEnv');
    const defaultConfig = path.join(process.cwd(), 'config', 'default.json');
    const envConfig = path.join(process.cwd(), 'config', `${env}.json`);
    const files = [defaultConfig, envConfig].filter((configPath) => {
        const exists = fs.existsSync(configPath);
        if (!exists) {
            // noinspection TsLint
            console.info(`Config file`, configPath, `does not exist`);
        }
        return exists
    });

    configSchema.loadFile(files);

    configSchema.validate()

    return configSchema.getProperties()
});

const appConfigProvider: AsyncFactoryProvider<AppConfig> = {
    provide: 'AppConfig',
    useFactory: async () => await loadConfig()
}

const databaseConfigProvider = propertyOfProvider(appConfigProvider, "database", DatabaseConfigToken)
const providers = [appConfigProvider, databaseConfigProvider];

@Module({
    providers,
    exports: providers
})
export class ConfigModule {
}
