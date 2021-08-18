import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsEnum } from 'class-validator';

import { Language, ViewType } from '../entities/setting.entity';

//! modify, Requirement.
export class UpdateSettingDto {
  @ApiProperty({ required: true })
  @IsBoolean()
  agreementMarketing: boolean;

  @ApiProperty({ enum: ['LIST', 'CARD'], default: 'LIST', required: false })
  @IsEnum(ViewType)
  viewtype: ViewType;

  @ApiProperty({ enum: ['KO', 'EN'], default: 'KO', required: false })
  @IsEnum(Language)
  language: Language;
}

export class CreateSettingDto {
  @ApiProperty({ required: true })
  @IsBoolean()
  agreementMarketing: boolean;
}
