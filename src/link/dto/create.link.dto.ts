import { ApiProperty } from '@nestjs/swagger';

import {
  IsUrl,
  IsEnum,
  Length,
  IsNumber,
  IsString,
  IsBoolean,
} from 'class-validator';

import { Type } from 'src/badge/entities/badge.entity';

export class CreateLinkDto {
  @ApiProperty({ description: '링크 제목', required: true })
  @Length(4, 30)
  @IsString()
  title: string;

  @ApiProperty({ description: '링크 URL', required: true })
  @IsString()
  href: string;

  @ApiProperty({ description: '링크 상품 가격', required: true })
  @IsNumber()
  price: number;

  @ApiProperty({ description: '링크 시작 일자', required: true })
  startedAt: number;

  @ApiProperty({ description: '링크 종료 일자', required: false })
  endedAt?: number;

  @ApiProperty({ description: '링크 활성화', required: true })
  @IsBoolean()
  activated: boolean;

  @ApiProperty({ description: '링크 사진', required: false })
  @IsString()
  assetId: string;

  @ApiProperty({ description: '배지 색상', required: false })
  @IsString()
  color: string;

  @ApiProperty({ description: '배경 색상', required: false })
  @IsString()
  backGroundColor: string;

  @ApiProperty({ description: '배지 내용', required: false })
  @IsString()
  content: string;

  @ApiProperty({
    description: '배지 모양 타입',
    required: false,
    type: 'enum',
    enum: ['ROUND_RECT', ' RECT', 'SPECH_BUBBLE'],
  })
  @IsEnum(Type)
  type: Type;
}
