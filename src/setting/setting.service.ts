import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Setting } from './entities/setting.entity';
import { CreateSettingDto, UpdateSettingDto } from './dto/setting.dto';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting) private settingRepository: Repository<Setting>,
  ) {}

  async getSetting(_id: string) {
    return await this.settingRepository.findOne({
      relations: ['account'],
      where: { account: _id },
    });
  }

  async modifySetting(data: UpdateSettingDto, _id: string) {
    return await this.settingRepository.update({ account: { _id } }, data);
  }

  // ! Function Name. Changed.
  async changeSetting(data: UpdateSettingDto, _id: string) {
    const defaultSetting = await this.getSetting(_id);
    if (!defaultSetting) {
      return await this.settingRepository
        .create({
          ...data,
          account: { _id },
        })
        .save();
    }
    return await this.modifySetting(data, _id);
  }

  async createSetting(data: CreateSettingDto, _id: string) {
    const { agreementMarketing } = data;
    return await this.settingRepository
      .create({
        agreementMarketing,
        account: { _id },
      })
      .save();
  }

  async mySetting(_id: string) {
    return await this.settingRepository.findOne({
      account: { _id },
    });
  }
}
