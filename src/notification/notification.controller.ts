import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';

import { VaildateCodeDTO } from './dto/vaildate.code.dto';
import { NotificationService } from './notification.service';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiBody({ type: VaildateCodeDTO })
  @ApiOperation({
    summary: '알림톡 전송',
    description: '알림톡 전송을 한다',
  })
  async sendVaildateCode(@Body() data: VaildateCodeDTO) {
    return await this.notificationService.sendMessage(data);
  }
}
