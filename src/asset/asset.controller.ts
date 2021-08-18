import {
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Express } from 'express';

import { UploadDto } from './dto/asset.upload.dto';
import { AssetService } from './asset.service';

@Controller('asset')
@ApiTags('Asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  @ApiOperation({
    summary: '이미지 업로드 API',
    description: '이미지를 업로드 한다',
  })
  @ApiConsumes('multipart/form-data') // swagger 에서 파일 입력
  @UseInterceptors(FileInterceptor('file')) // 입력한 file을 imageUpload로
  @ApiBody({
    description: 'image upload',
    type: UploadDto,
  })
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.assetService.upload(file);
  }
}
