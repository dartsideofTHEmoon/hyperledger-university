import {Schema, SchemaObj} from "convict"

export interface DatabaseConfig {
    host: string
    port: number
    username: string
    password: string | undefined
    database: string
    retryAttempts?: number
    retryDelay?: number
    keepConnectionAlive?: boolean
}

export const DatabaseConfigToken = 'DatabaseConfig'

export const databaseConfigSchema: Schema<DatabaseConfig> = {
    host: {
        doc: "Database connection hostname",
        default: "localhost",
        env: "DATABASE_HOST",
        format(value: any) {
            if (typeof value !== "string") {
                throw new Error("must be a string")
            }
        }
    } as SchemaObj<string>,

    port: {
        doc: "Database connection port",
        default: 5432,
        format(value: any) {
            if (typeof value !== "number") {
                throw new Error("must be a number")
            }

            if (value < 1 || value > 65535) {
                throw new Error("must be in range from 1 to 65535")
            }
        }
    } as SchemaObj<number>,

    username: {
        doc: "Username used to connect to database",
        default: "web",
        env: "DATABASE_USERNAME",
        format(value: any) {
            if (typeof value !== "string") {
                throw new Error("must be a string")
            }
        }
    } as SchemaObj<string>,

    password: {
        doc: "Password used to connect to database",
        default: "pass",
        sensitive: true,
        env: "DATABASE_PASSWORD",
        format(value: string | undefined) {
            if (!value) {
                throw new Error("must be a string")
            }
        }
    } as SchemaObj<string | undefined>,

    database: {
        doc: "Database name used to connect to database",
        default: "notary",
        format(value: any) {
            if (typeof value !== "string") {
                throw new Error("must be a string")
            }
        }
    } as SchemaObj<string>
}
