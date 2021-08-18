import { ApiProperty } from '@nestjs/swagger';

import {
  IsAlphanumeric,
  IsBoolean,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { BIRTH_REG, PHONE_REG } from 'src/utils/constant';

export class RegisterAccountDto {
  @ApiProperty({ description: '회원 ID', required: true })
  @IsAlphanumeric('en-US', {
    message: '영어와 숫자 조합이여야합니다',
  })
  uid: string;

  @ApiProperty({ description: '회원 비밀번호', required: true })
  @Length(6, 20)
  @IsString()
  password: string;

  @ApiProperty({ description: '회원 이름', required: true })
  @IsString()
  name: string;

  @ApiProperty({ description: '회원 핸드폰 번호', required: true })
  @Length(10, 11)
  @Matches(PHONE_REG)
  @IsString()
  phone: string;

  @ApiProperty({ description: '회원 생년월일', required: true })
  @Length(8)
  @Matches(BIRTH_REG)
  @IsString()
  birth: string;

  @ApiProperty({
    description: '정보 수신동의',
    required: true,
  })
  @IsBoolean()
  agreementMarketing: boolean;
}
