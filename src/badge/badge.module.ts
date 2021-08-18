import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Badge } from './entities/badge.entity';
import { BadgeService } from './badge.service';

@Module({
  imports: [TypeOrmModule.forFeature([Badge])],
  providers: [BadgeService],
  exports: [BadgeService],
})
export class BadgeModule {}
