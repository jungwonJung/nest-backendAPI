import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthRequest } from 'src/utils/models/AuthRequest';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt.auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @Router /auth/validate
   */

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @Get('/validate')
  @ApiOperation({
    summary: '토큰인증 API',
    description: '특정 토큰값의 회원 _id 를 반환한다',
  })
  async validate(@Request() req: AuthRequest) {
    return await this.authService.validateAccount(req.user);
  }
}
