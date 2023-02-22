import { IsNotEmpty, IsString } from "class-validator"

import { ApiRequestModel } from "./api-request.model"

export class ApiAction1TargetRequestModel extends ApiRequestModel {
  @IsNotEmpty()
  @IsString()
  id: string
}
