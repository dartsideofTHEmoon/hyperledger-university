import {Module} from "@nestjs/common";
import {Gateway} from 'fabric-network';
import {FabricService} from "./fabric.service";
import {AdminExists} from "./adminExists.middleware";
import {FabricController} from "./fabric.controller";

const fabricGateway = "FabricGateway"

const fabricGatewayFactory = {
    provide: fabricGateway,
    useFactory: () => {
        return new Gateway()
    }
};

@Module({
    providers: [fabricGatewayFactory, FabricService, AdminExists],
    exports: ['FabricGateway', FabricService, AdminExists],
    controllers: [FabricController]
})
export class FabricModule {
}
