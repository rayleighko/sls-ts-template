import { IsNotEmpty, IsString } from "class-validator"

import { ApiRequestModel } from "./api-request.model"

export class ApiAction2TargetRequestModel extends ApiRequestModel {
  @IsNotEmpty()
  @IsString()
  id: string
}
