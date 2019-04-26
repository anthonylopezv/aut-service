
import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiModelProperty({ type: String })
  @IsString()
  readonly username: string;

  @ApiModelProperty({ type: String })
  @MinLength(6)
  readonly password: string;
}