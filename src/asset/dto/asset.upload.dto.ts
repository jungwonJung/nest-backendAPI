import { ApiProperty } from '@nestjs/swagger';

export class UploadDto {
  @ApiProperty({ type: 'file', required: false })
  file: any;
}
