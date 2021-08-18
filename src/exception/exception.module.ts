import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Exception } from './entities/exception.entity';
import { ExceptionService } from './exception.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exception])],
  providers: [ExceptionService],
  exports: [ExceptionService],
})
export class ExceptionModule {}
