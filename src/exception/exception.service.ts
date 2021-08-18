import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Exception } from './entities/exception.entity';

@Injectable()
export class ExceptionService {
  constructor(
    @InjectRepository(Exception)
    private exceptionRepository: Repository<Exception>,
  ) {}

  async createException(desc: Error, path: string, body?: object) {
    const { createdAt, ...result } = await this.exceptionRepository
      .create({
        path,
        description: desc.stack,
        body: body ? body : null,
      })
      .save();

    return result;
  }
}
