import { ApiProperty } from '@nestjs/swagger';

import { IsAlphanumeric, IsString, Length, Matches } from 'class-validator';

import { PHONE_REG } from 'src/utils/constant';

export class UpdateAccountDto {
  @ApiProperty({ description: '회원 ID', required: true })
  @IsAlphanumeric('en-US')
  uid: string;

  @ApiProperty({ description: '회원 비밀번호', required: true })
  @Length(6, 20)
  @IsString()
  password: string;

  @ApiProperty({ description: '새로운 회원 비밀번호', required: false })
  @Length(6, 20)
  @IsString()
  newPassword: string;
}

export class checkIdDto {
  @ApiProperty({ description: '회원 ID', required: true })
  @IsString()
  @IsAlphanumeric()
  uid: string;
}

export class ModifyPwDto {
  @ApiProperty({ description: '회원 핸드폰 번호', required: true })
  @Length(10, 11)
  @Matches(PHONE_REG)
  phone: string;

  @ApiProperty({ description: '새로운 회원 비밀번호', required: true })
  @Length(6, 20)
  @IsString()
  newPassword: string;
}
