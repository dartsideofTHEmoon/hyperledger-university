import {Controller, Get, Res} from '@nestjs/common';
import {CertificateService} from "./certificate.service";
import {Response} from "express";

@Controller("api/certificate")
export class CertificateController {
    constructor(
        private readonly certificateService: CertificateService,
    ) {}

    @Get()
    async listCertificateProposals(
        @Res() response: Response,
    ) {
        const certificates = await this.certificateService.listCertificateProposals()

        response.send({certificates})
    }
}
