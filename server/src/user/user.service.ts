import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserCredentialsDto} from "./user.dto";
import {User} from "./user.entity";
import {FileSystemWallet, X509WalletMixin} from "fabric-network";
import * as path from "path";
import * as fs from "fs";
import FabricCAServices from "fabric-ca-client";


@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name)

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async findByEmail(email: string) {
        return this.userRepository.findOne({
            email
        })
    }

    async findWithCredentials(credentials: UserCredentialsDto): Promise<User | null> {
        const user = await this.findByEmail(credentials.email)
        if (!user || !(await user.validatePassword(credentials.password))) {
            return null
        }
        return user
    }
}