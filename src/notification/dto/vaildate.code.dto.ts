import { ApiProperty } from '@nestjs/swagger';

import { Length, Matches } from 'class-validator';

import { PHONE_REG } from 'src/utils/constant';

export class VaildateCodeDTO {
  @ApiProperty({ required: true })
  @Length(10, 11)
  @Matches(PHONE_REG)
  phone: string;
}
