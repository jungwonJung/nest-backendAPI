import {
  Get,
  Body,
  Patch,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthRequest } from 'src/utils/models/AuthRequest';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { SettingService } from './setting.service';
import { UpdateSettingDto } from './dto/setting.dto';

@Controller('setting')
@ApiTags('Setting')
@ApiBearerAuth('accessToken')
@UseGuards(JwtAuthGuard)
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  /**
   *
   * @Router /setting
   */
  @Patch()
  @ApiBody({ type: UpdateSettingDto })
  @ApiOperation({
    summary: '회원 설정 수정 API',
    description: '회원 설정을 수정한다',
  })
  update(@Body() body: UpdateSettingDto, @Request() req: AuthRequest) {
    return this.settingService.changeSetting(body, req.user);
  }

  /**
   * @Router /setting
   */
  @Get()
  @ApiOperation({
    summary: '회원 설정 확인 API',
    description: '현재 회원의 설정을 확인한다',
  })
  checkMySetting(@Request() req: AuthRequest) {
    return this.settingService.mySetting(req.user);
  }
}
