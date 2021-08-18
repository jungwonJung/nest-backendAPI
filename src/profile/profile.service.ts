import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/account.service';

import { Repository } from 'typeorm';

import { Profile } from './entities/profile.entity';
import { SNSLink } from './entities/sns.entity';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.create.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(SNSLink) private snslinkRepository: Repository<SNSLink>,
    private accountService: AccountService,
  ) {}

  /***/
  async updateAndCreateProfile(data: CreateProfileDto, _id: string) {
    const { name, bio, assetId, ...res } = data;

    const userProfile = await this.getMyProfile(_id);
    //! modify, Wrong Variable Name. ok

    if (userProfile) {
      const updateProfile = await this.updateProfile(
        { name, bio, assetId },
        _id,
      );
      const updateSNS = await this.snslinkRepository.update(
        { _id: userProfile.sns._id },
        { ...res },
      );
      return { updateProfile, updateSNS };
    } else {
      const snsInfo = await this.createSNSLink(data);
      const createProfile = await this.profileRepository
        .create({
          account: { _id },
          sns: { _id: snsInfo._id },
          assetId,
          name,
          bio,
        })
        .save();
      return createProfile;
    }
  }

  /***/
  async getMyProfile(_id: string) {
    return await this.profileRepository.findOne({
      relations: ['sns'],
      where: { account: _id },
    });
  }

  /***/
  async getProfile(uid: string) {
    const { _id } = await this.accountService.findUserId(uid);

    return await this.profileRepository.findOne({
      relations: ['sns'],
      where: { account: _id },
    });
  }

  /***/
  async updateProfile(data: UpdateProfileDto, _id: string) {
    //! modify, Use Method.
    return await this.profileRepository.update({ account: { _id } }, data);
  }

  /***/
  async createSNSLink(data: CreateProfileDto) {
    const { name, bio, ...res } = data;
    return await this.snslinkRepository.create({ ...res }).save();
  }

  /***/
  async findSNSLink(_id: string) {
    return await this.snslinkRepository.findOne({ _id });
  }
}
