import { IsEnum, IsString } from 'class-validator';

import { Type } from '../entities/badge.entity';

export class CreateBadgeDto {
  @IsString()
  color?: string;

  @IsString()
  backGroundColor?: string;

  @IsString()
  content?: string;

  @IsEnum(Type)
  type?: Type;
}
