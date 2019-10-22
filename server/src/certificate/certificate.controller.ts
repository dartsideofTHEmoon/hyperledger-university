import {Controller, Get, Post, Res} from '@nestjs/common';
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

    @Post()
    async attestCertificate(
        @Res() response: Response
    ) {
        const dupa = await this.certificateService.attestCertificate()
        response.send({dupa})
    }
}
