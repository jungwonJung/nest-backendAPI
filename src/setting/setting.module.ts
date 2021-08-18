import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { Setting } from './entities/setting.entity';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Setting]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getConfig('jwt_secret'),
        signOptions: {
          expiresIn: configService.getConfig('jwt_expired'),
        },
      }),
    }),
  ],
  controllers: [SettingController],
  providers: [SettingService],
  exports: [SettingService],
})
export class SettingModule {}
