import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Request,
  Delete,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthRequest } from 'src/utils/models/AuthRequest';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { AccountService } from './account.service';
import { FindAccountDto } from './dto/find.account.dto';
import { LoginAccountDto } from './dto/login.account.dto';
import { RegisterAccountDto } from './dto/register.account.dto';
import { ModifyPwDto, UpdateAccountDto } from './dto/update.account.dto';

@Controller('account')
@ApiTags('Account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /**
   * @Router /account/register
   */
  @Post('register')
  @ApiOperation({
    summary: '회원가입 API',
    description:
      '회원가입을 한다, 아이디와 핸드폰 번호가 중복시에는 불가하다, 가입이 성공적으로 끝나면 토큰 발급',
  })
  @ApiBody({ type: RegisterAccountDto })
  register(@Body() body: RegisterAccountDto) {
    return this.accountService.register(body);
  }

  /**
   * @Router /account/login
   */
  @Post('login')
  @ApiOperation({
    summary: '로그인 API',
    description:
      '로그인을 진행한다, 비밀번호가 틀린경우엔 불가, 로그인이 성공적으로 끝나면 토큰발급',
  })
  @ApiBody({ type: LoginAccountDto })
  login(@Body() body: LoginAccountDto) {
    return this.accountService.login(body);
  }

  /**
   * @Router /account/find
   */
  @Post('find')
  @ApiOperation({
    summary: '회원 아이디 및 비밀번호 조회 API',
    description: '회원 아이디 및 비밀번호를 조회 한다, 코드 발송 및 코드 인증 ',
  })
  @ApiBody({ type: FindAccountDto })
  find(@Body() body: FindAccountDto) {
    return this.accountService.findAccount(body);
  }

  /**
   *
   * @Router /account/update
   */
  @Patch('update')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '회원 uid 수정 및 비밀번호 변경 API',
    description: '회원 uid 중복 조회 및 수정, 비밀번호 수정 한다',
  })
  @ApiBody({ type: UpdateAccountDto })
  update(@Body() body: UpdateAccountDto, @Request() req: AuthRequest) {
    return this.accountService.userInfoUpdate(body, req.user);
  }

  /**
   *
   * @Router
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '회원 정보 조회 API',
    description: '토큰 인증하여 해당유저 정보 조회 한다',
  })
  userInfo(@Request() req: AuthRequest) {
    return this.accountService.userInfo(req.user);
  }

  // @Patch('update/pw')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('accessToken')
  // @ApiOperation({
  //   summary: '회원 비밀번호 수정 API',
  //   description: '회원 비밀번호를 수정 한다',
  // })
  // @ApiBody({ type: ModifyPwDto })
  // updatePw(@Body() body: ModifyPwDto, @Request() req: AuthRequest) {
  //   return this.accountService.modifyPw(body, req.user);
  // }

  @Patch('update/pw')
  @ApiBody({ type: ModifyPwDto })
  @ApiOperation({
    summary: '회원 비밀번호 수정 링크 API',
    description: '회원 비밀번호를 수정 하는 링크에 들어갈 API',
  })
  newPw(@Body() body: ModifyPwDto) {
    return this.accountService.modifyPhonePw(body);
  }

  @Delete('delete')
  @Patch('update/pw')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '회원 탈퇴 API',
    description: '회원 정보를 탈퇴 (softdelete) 한다',
  })
  delete(@Request() req: AuthRequest) {
    return this.accountService.deleteAccount(req.user);
  }
}
