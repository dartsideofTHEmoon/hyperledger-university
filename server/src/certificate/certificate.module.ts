import { Module } from '@nestjs/common';
import {CertificateController} from "./certificate.controller";

@Module({
    imports: [],
    controllers: [CertificateController],
    providers: [],
})
export class CertificateModule {}
