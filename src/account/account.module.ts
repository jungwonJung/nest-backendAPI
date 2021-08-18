import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { forwardRef, Module } from '@nestjs/common';

import { Account } from './account.entity';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { SettingModule } from 'src/setting/setting.module';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    ConfigModule,
    SettingModule,
    PassportModule,
    TypeOrmModule.forFeature([Account]),
    forwardRef(() => NotificationModule),
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
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
