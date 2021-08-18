import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Badge } from './entities/badge.entity';
import { CreateBadgeDto } from './dto/create.badge.dto';

@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(Badge) private badgeRepository: Repository<Badge>,
  ) {}

  //! modify. Addtion Entity Row Column. BackgroundColor & Change Entity Row name. ok
  async createBadge(data: CreateBadgeDto) {
    return await this.badgeRepository.create(data).save();
  }

  async updateBadge(data: CreateBadgeDto, _id: string) {
    return await this.badgeRepository.update(_id, data);
  }

  async deleteBadge(_id: string) {
    return await this.badgeRepository.softDelete({ _id });
  }
}
