import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsString, Length, Matches } from 'class-validator';

import { PHONE_REG } from 'src/utils/constant';

export enum FindType {
  FIND_ID = 'FIND_ID',
  FIND_PW = 'FIND_PW',
}

export class FindAccountDto {
  @ApiProperty({
    description: '아이디 찾기 , 비밀번호 찾기',
    required: true,
    type: 'enum',
    enum: ['FIND_ID', 'FIND_PW'],
  })
  @IsEnum(FindType)
  type: FindType;

  @ApiProperty({ description: '인증번호', required: true })
  @Length(6)
  @IsString()
  code: string;

  @ApiProperty({ description: '회원 핸드폰 번호', required: true })
  @Length(10, 11)
  @Matches(PHONE_REG)
  phone: string;
}
