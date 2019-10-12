import {HttpException, HttpStatus, Injectable, NestMiddleware} from "@nestjs/common";
import {FabricService} from "./fabric.service";

@Injectable()
export class AdminExists implements NestMiddleware {

    constructor(
        private readonly fabricService: FabricService
    ) {
    }

    async use(req: Request, res: Response, next: Function) {

        if (!await this.fabricService.identityExists('admin')) {
            await this.fabricService.createAdminIdentity()
        }
        console.log(`Admin identity exists.`)
        next()
    }
}