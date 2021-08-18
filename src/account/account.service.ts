import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Account } from './account.entity';
import { ConfigService } from 'src/config/config.service';
import { FindAccountDto } from './dto/find.account.dto';
import { SettingService } from 'src/setting/setting.service';
import { LoginAccountDto } from './dto/login.account.dto';
import { RegisterAccountDto } from './dto/register.account.dto';
import { ModifyPwDto, UpdateAccountDto } from './dto/update.account.dto';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwtService: JwtService,
    @Inject(forwardRef(() => NotificationService))
    private notificationService: NotificationService,
    private settingService: SettingService,
    private configService: ConfigService,
  ) {}

  /***/
  async register(data: RegisterAccountDto) {
    const { uid, phone, agreementMarketing, ...body } = data;

    const existsId = await this.accountRepository.findOne({
      uid,
    });

    const existsPhone = await this.accountRepository.findOne({
      phone,
    });

    if (existsId || existsPhone) {
      throw new Error('이미 존재하는 아이디 & 핸드폰 번호');
    }

    const password = await bcrypt.hash(data.password, 12);

    const { _id } = await this.accountRepository
      .create({
        ...body,
        uid,
        password,
        phone,
      })
      .save();
    await this.settingService.createSetting(data, _id);

    return {
      token: this.jwtService.sign({ id: _id }),
    };
  }

  /***/
  async login(data: LoginAccountDto) {
    const { uid, password } = data;

    const account = await this.accountRepository.findOne({
      uid,
      deletedAt: null,
    });

    if (!account) {
      throw Error();
    }

    const result = await bcrypt.compare(password, account.password);

    if (!result) {
      throw new Error('틀린 비밀번호');
    }

    const payload = { id: account._id };

    //! 만료시간 추가. expiredAt 물어볼내용

    return {
      token: this.jwtService.sign(payload),
    };
  }

  /**
   * 회원 아이디 및 비밀번호 찾기
   */
  async findAccount(data: FindAccountDto) {
    const { type, code, phone } = data;

    const vaildateResult = await this.notificationService.vaildateCode(code);

    const map = new Map();

    const { uid } = await this.accountRepository.findOne({ phone });

    const newPw = await this.modifyPw;

    if (!vaildateResult) {
      throw new Error('인증번호가 올바르지 않습니다');
    }

    map.set('FIND_ID', uid);
    map.set('FIND_PW', newPw);

    return map.get(type);
  }

  /**
   * 토큰으로 사용자 확인(authService 에서 검증)
   */
  find = async (_id: string) =>
    await this.accountRepository.findOne({
      where: { _id },
      select: ['_id', 'uid', 'phone'],
    });

  /**
   * 핸드폰 번호로 사용자 정보 조회
   */
  findUser(phone: string) {
    return this.accountRepository.findOne({ phone });
  }

  /**
   *
   * 아이디로 회원 정보 조회
   */
  findUserId(uid: string) {
    return this.accountRepository.findOne({ uid });
  }

  /**
   * 비밀번호 확인검사
   */
  async checkPw(data: UpdateAccountDto, _id: string) {
    const { password } = data;

    const findUser = await this.accountRepository.findOne({ _id });

    const checkUserPw = await bcrypt.compare(password, findUser.password);

    if (!checkUserPw) {
      throw new Error('비밀번호가 맞지않습니다');
    }
    return checkUserPw;
  }

  /**
   * 비밀번호 수정
   */
  async modifyPw(data: UpdateAccountDto, _id: string) {
    const { newPassword } = data;

    const confirmPassword = await this.checkPw(data, _id);

    if (confirmPassword) {
      const password = await bcrypt.hash(newPassword, 12);
      return await this.accountRepository.update(_id, {
        password,
      });
    }
  }

  /**
   * 핸드폰 번호로 회원 확인 후 비밀번호 수정
   */
  async modifyPhonePw(data: ModifyPwDto) {
    const { phone, newPassword } = data;

    const { _id } = await this.findUser(phone);

    const password = await bcrypt.hash(newPassword, 12);

    return await this.accountRepository.update(_id, { password });
  }

  /**
   * 회원 아이디 중복검사 및 수정
   */
  //! modify. Wrong Service Biz Logic.   Ok
  async userInfoUpdate(data: UpdateAccountDto, _id: string) {
    const { uid, newPassword } = data;

    const checkUid = await this.accountRepository.findOne({ uid });

    const confirmPassword = await this.checkPw(data, _id);

    const password = await bcrypt.hash(newPassword, 12);

    if (!confirmPassword) {
      throw new Error('비밀번호 를 입력해주세요');
    }
    if (!checkUid) {
      throw new Error('아이디가 중복됩니다');
    }

    return await this.accountRepository.update(_id, { uid, password });
  }

  /**
   * 회원탈퇴
   */
  async deleteAccount(_id: string) {
    return await this.accountRepository.softDelete(_id);
  }

  /**
   * 회원 정보 조회
   */
  async userInfo(_id: string) {
    return await this.accountRepository.findOne(
      { _id },
      {
        relations: ['profile', 'setting', 'link', 'news'],
      },
    );
  }
}
