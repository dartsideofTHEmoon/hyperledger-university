import { Module } from '@nestjs/common';
import {CertificateController} from "./certificate.controller";
import {CertificateService} from "./certificate.service";
import {FabricModule} from "../fabric/fabric.module";

@Module({
    imports: [FabricModule],
    controllers: [CertificateController],
    providers: [CertificateService],
    exports: [CertificateService]
})
export class CertificateModule {}
