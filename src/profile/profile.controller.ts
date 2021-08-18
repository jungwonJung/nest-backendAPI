import {
  Controller,
  Body,
  UseGuards,
  Request,
  Patch,
  Get,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthRequest } from 'src/utils/models/AuthRequest';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/profile.create.dto';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * @Router /profile
   */
  @Patch()
  @ApiBody({ type: CreateProfileDto })
  @ApiOperation({
    summary: '회원 profile 수정',
    description: '회원 profile 을 수정',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  create(@Body() body: CreateProfileDto, @Request() req: AuthRequest) {
    return this.profileService.updateAndCreateProfile(body, req.user);
  }

  /**
   * @Router /profile/my
   */
  @Get('my')
  @ApiOperation({
    summary: '본인 profile 조회',
    description: '본인 profile 조회하기',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  getMyProfile(@Request() req: AuthRequest) {
    return this.profileService.getMyProfile(req.user);
  }

  /**
   * @Router /profile
   */
  @Get('/:uid')
  @ApiOperation({
    summary: '특정유저 profile 조회',
    description: '특정유저 profile 조회하기',
  })
  getProfile(@Param('uid') uid: string) {
    return this.profileService.getProfile(uid);
  }
}
