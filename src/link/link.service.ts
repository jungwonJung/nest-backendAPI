import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Link } from './link.entity';
import { BadgeService } from 'src/badge/badge.service';
import { CreateLinkDto } from './dto/create.link.dto';
import { DeleteLinkDto } from './dto/delete.link.dto';
import { AccountService } from 'src/account/account.service';
import { RESPONSE_TEMPLATE } from 'src/utils/constant';
import { UpdateLinkDto } from './dto/update.link.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link) private linkRepository: Repository<Link>,
    private badgeService: BadgeService,
    private accountService: AccountService,
  ) {}

  async addLink(data: CreateLinkDto, _id: string) {
    const { assetId, color, content, type, backGroundColor, ...res } = data;
    const { _id: badgeId } = await this.badgeService.createBadge({
      color,
      content,
      type,
      backGroundColor,
    });

    await this.linkRepository
      .create({
        account: { _id },
        //! modify. Variable Name ok
        assetId,
        badge: { _id: badgeId },
        ...res,
      })
      .save();

    return RESPONSE_TEMPLATE(true, 'Successful Addtion Link');
  }

  async updateLink(data: UpdateLinkDto, userId: string) {
    const {
      _id,
      title,
      href,
      price,
      startedAt,
      endedAt,
      activated,
      assetId,
      ...res
    } = data;
    await this.linkRepository.update(
      { account: { _id: userId }, _id },
      { title, href, price, startedAt, endedAt, assetId, activated },
    );
    const { badge } = await this.linkRepository.findOne(_id, {
      relations: ['badge'],
    });
    return await this.badgeService.updateBadge({ ...res }, badge._id);
  }

  //! modify. Not Find, Get || didn't use Token Id. use UserName (uid) ok
  async getLinkList(uid: string) {
    const { _id } = await this.accountService.findUserId(uid);
    return await this.linkRepository.find({
      relations: ['badge'],
      where: { account: _id, deletedAt: null },
    });
  }

  async getMyLinkList(_id: string) {
    return await this.linkRepository.find({
      relations: ['badge'],
      where: { account: _id, deletedAt: null },
    });
  }

  async deleteLink(data: DeleteLinkDto, user_id: string) {
    const { _id } = data;
    const linkInfo = await this.linkRepository.findOne({
      relations: ['account', 'badge'],
      where: { account: user_id, _id },
    });
    const deleteLink = await this.linkRepository.softDelete(linkInfo._id);
    const deleteBadge = await this.badgeService.deleteBadge(linkInfo.badge._id);
    return { deleteLink, deleteBadge };
  }
}
