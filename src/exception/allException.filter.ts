import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { OPCODE } from 'src/utils/constant';
import { ExceptionService } from './exception.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly exceptionService: ExceptionService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const { _id, path } = await this.exceptionService.createException(
      exception as Error,
      request.url,
      request.url.includes('login') || request.url.includes('register')
        ? null
        : request.body,
    );

    response.status(status).json({
      OPCODE: OPCODE.FAILED,
      eventId: _id,
      path,
    });
  }
}
