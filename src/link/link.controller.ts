import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';
import {
  ApiBody,
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { LinkService } from './link.service';
import { AuthRequest } from 'src/utils/models/AuthRequest';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { CreateLinkDto } from './dto/create.link.dto';
import { DeleteLinkDto } from './dto/delete.link.dto';
import { UpdateLinkDto } from './dto/update.link.dto';

@ApiTags('Link')
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  /**
   * @Router /link
   */
  @Post()
  @ApiOperation({ summary: '링크등록 API', description: '링크등록을 한다' })
  @ApiBody({ type: CreateLinkDto })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateLinkDto, @Request() req: AuthRequest) {
    return await this.linkService.addLink(body, req.user);
  }

  /**
   * @Router /link
   */
  @Patch()
  @ApiOperation({ summary: '링크수정 API', description: '링크수정을 한다' })
  @ApiBody({ type: UpdateLinkDto })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  update(@Body() body: UpdateLinkDto, @Request() req: AuthRequest) {
    return this.linkService.updateLink(body, req.user);
  }

  /**
   * @Router /link
   */
  @Get('/my')
  @ApiOperation({
    summary: '내 링크조회 API',
    description: '내 링크조회를 한다',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  getMyLink(@Request() req: AuthRequest) {
    return this.linkService.getMyLinkList(req.user);
  }

  /**
   * @Router /link
   */
  @Get('/:uid')
  @ApiOperation({
    summary: '특정유저 uid 링크조회 API',
    description: '특정유저 uid로 링크조회를 한다',
  })
  @ApiParam({ name: 'uid', type: 'string' })
  getLink(@Param('uid') uid: string) {
    return this.linkService.getLinkList(uid);
  }

  //! Addtion Delete Link. ( Soft Delete ). ok
  /**
   * @Router /link
   */
  @Delete()
  @ApiOperation({ summary: '링크삭제 API', description: '링크삭제를 한다' })
  @ApiBody({ type: DeleteLinkDto })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  delete(@Body() body: DeleteLinkDto, @Request() req: AuthRequest) {
    return this.linkService.deleteLink(body, req.user);
  }
}
