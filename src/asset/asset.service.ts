import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';

import { Asset } from './asset.entity';
import { uuid } from 'src/utils/code/asset.code';
import { ConfigService } from 'src/config/config.service';

const STATIC_URL = 'https://cdn.platinumbridge.co.kr/';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
    private configService: ConfigService,
  ) {}

  private ACCESS_KEY = this.configService.getConfig('access_key');
  private SECRET_KEY = this.configService.getConfig('secret_access_key');
  private BUCKET_NAME = this.configService.getConfig('asset_bucket');
  private REGION = this.configService.config.AWS_REGION;

  private s3 = new AWS.S3({
    accessKeyId: this.ACCESS_KEY,
    secretAccessKey: this.SECRET_KEY,
    region: this.REGION,
  });

  async upload(file: Express.Multer.File) {
    const UUID = uuid();

    const params: S3.Types.PutObjectRequest = {
      Bucket: this.BUCKET_NAME,
      //? 왜 이렇게 정했는지, 더 나은 방법들 uuid 형태로 저장하여 중복파일명 방지
      Key: `asset/${UUID}`,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    };

    const result = await this.s3.upload(params).promise();

    const { createdAt, deletedAt, ...data } = await this.assetRepository
      .create({
        url: STATIC_URL + result.Key,
      })
      .save();

    return data;
  }
}
