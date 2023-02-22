import { IsNotEmpty, IsString } from "class-validator"

import { DataModel } from "./data.model"

export class TargetModel extends DataModel {
  @IsNotEmpty()
  @IsString()
  title: string

  constructor(model: TargetModel) {
    super(model)
  }
}
