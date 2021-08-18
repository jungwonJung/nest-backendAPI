import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExceptionModule } from './exception/exception.module';
import { AllExceptionsFilter } from './exception/allException.filter';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { LinkModule } from './link/link.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AssetModule } from './asset/asset.module';
import { ProfileModule } from './profile/profile.module';
import { BadgeModule } from './badge/badge.module';
import { SettingModule } from './setting/setting.module';

@Module({
  imports: [
    AccountModule,
    AuthModule,
    ConfigModule,
    LinkModule,
    ExceptionModule,
    AssetModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.getConfig('/database_url'),
          username: configService.getConfig('/database_host'),
          password: configService.getConfig('/database_password'),
          port: 3306,
          database: 'ex',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    AssetModule,
    ProfileModule,
    BadgeModule,
    SettingModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule {}
