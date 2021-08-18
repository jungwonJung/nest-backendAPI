import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { Link } from './link.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { LinkService } from './link.service';
import { BadgeModule } from 'src/badge/badge.module';
import { ConfigModule } from 'src/config/config.module';
import { AccountModule } from 'src/account/account.module';
import { ConfigService } from 'src/config/config.service';
import { LinkController } from './link.controller';

@Module({
  imports: [
    AccountModule,
    BadgeModule,
    ConfigModule,
    PassportModule,
    TypeOrmModule.forFeature([Link]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getConfig('jwt_secret'),
        signOptions: {
          expiresIn: configService.getConfig('jwt_expired'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [LinkController],
  providers: [LinkService, AuthService, JwtStrategy],
  exports: [LinkService],
})
export class LinkModule {}
