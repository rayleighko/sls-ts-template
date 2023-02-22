import { IsNotEmpty, IsString } from "class-validator"

export class DataModel {
  @IsNotEmpty()
  @IsString()
  ulid: string

  constructor(model: DataModel) {
    this.ulid = model.ulid
  }
}
