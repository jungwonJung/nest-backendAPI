import { Injectable } from '@nestjs/common';

import { getParameterSync } from 'aws-param-store';

@Injectable()
export class ConfigService {
  config = {
    PORT: 8000,
    AWS_REGION: 'ap-northeast-2',
    STAGE: process.env.STAGE,
    AWS_SSM_BASE_PATH: `/linkle/`,
  };

  getConfig(path: string) {
    const PATH =
      this.config.AWS_SSM_BASE_PATH +
      `${!path.includes('/') ? '' : this.config.STAGE}` +
      path;

    return getParameterSync(PATH, {
      region: this.config.AWS_REGION,
    }).Value;
  }
}
