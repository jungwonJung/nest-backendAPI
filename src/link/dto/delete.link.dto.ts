import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class DeleteLinkDto {
  @ApiProperty({ description: '링크 _id', required: true })
  @IsString()
  _id: string;
}
