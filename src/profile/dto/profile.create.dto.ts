import { ApiProperty } from '@nestjs/swagger';

import { IsString, Length } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ description: '회원이름', required: false })
  @IsString()
  @Length(0, 28)
  name: string;

  @ApiProperty({ description: '회원이름', required: false })
  @IsString()
  @Length(0, 100)
  bio?: string;

  @ApiProperty({ description: '이미지 ', required: false })
  assetId: string;

  @ApiProperty({ description: '유튜브 주소', required: false })
  @IsString()
  youtube?: string;

  @ApiProperty({ description: '인스타그램 아이디', required: false })
  @IsString()
  instagram?: string;

  @ApiProperty({ description: '페이스북 아이디', required: false })
  @IsString()
  facebook?: string;

  @ApiProperty({ description: '네이버블로그 ', required: false })
  @IsString()
  naverBlog?: string;

  @ApiProperty({ description: '웹 주소', required: false })
  website?: string;
}

export class UpdateProfileDto {
  @ApiProperty({ description: '회원이름', required: false })
  @IsString()
  @Length(0, 28)
  name: string;

  @ApiProperty({ description: '회원이름', required: false })
  @IsString()
  @Length(0, 100)
  bio?: string;

  @ApiProperty({ description: '이미지 ', required: false })
  assetId: string;
}
