import {Inject, Injectable, Logger} from "@nestjs/common";
import {Gateway} from "fabric-network";


@Injectable()
export class CertificateService {

    private readonly logger = new Logger(CertificateService.name)

    constructor(
        @Inject('FabricGateway') private readonly fabricGateway: Gateway
    ) {}

    async list() {
        console.log(__filename)
    }

}