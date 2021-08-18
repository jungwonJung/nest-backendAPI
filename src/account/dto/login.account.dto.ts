import { ApiProperty } from '@nestjs/swagger';

import { IsAlphanumeric, IsString, Length } from 'class-validator';

export class LoginAccountDto {
  @ApiProperty({ description: '회원 ID', required: true })
  @IsAlphanumeric('en-US', {
    message: '영어와 숫자 조합이여야합니다',
  })
  uid: string;

  @ApiProperty({ description: '회원 비밀번호', required: true })
  @Length(6, 20)
  @IsString()
  password: string;
}
