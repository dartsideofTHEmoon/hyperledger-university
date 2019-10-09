import { ValidationPipe, Body } from "@nestjs/common"

export const ValidBody = () => Body(new ValidationPipe())
