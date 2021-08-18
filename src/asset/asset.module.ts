import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Asset } from './asset.entity';
import { AssetService } from './asset.service';
import { ConfigModule } from 'src/config/config.module';
import { AssetController } from './asset.controller';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Asset])],
  controllers: [AssetController],
  providers: [AssetService],
  exports: [AssetService],
})
export class AssetModule {}
