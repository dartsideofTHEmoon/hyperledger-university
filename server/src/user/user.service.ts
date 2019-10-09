import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserCredentialsDto } from "./user.dto";
import { User } from "./user.entity";


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

    async findById(userId: string) {
        return this.userRepository.findOne({
            id: userId
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