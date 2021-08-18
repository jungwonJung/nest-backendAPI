import { InjectRepository } from '@nestjs/typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { randomCode } from 'src/utils/code/notification.code';
import { Notification } from './notification.entity';
import { ToastService } from './toast/toast.service';
import { AccountService } from 'src/account/account.service';
import { VaildateCodeDTO } from './dto/vaildate.code.dto';

type SendMessageDTO = VaildateCodeDTO;

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private toastService: ToastService,
    @Inject(forwardRef(() => AccountService))
    private accountService: AccountService,
  ) {}

  //! modify. Biz Logic Defined
  async sendMessage(data: SendMessageDTO) {
    const randomcode = randomCode();
    const { phone } = data;
    const text = `받으신 코드번호를 입력해주세요 ${randomcode}`;

    this.toastService.sendSMS({
      content: '???',
      recipients: [phone],
    });

    this.notificationRepository
      .create({
        recipients: [phone],
        content: text,
        code: 'randomcode',
      })
      .save();
  }

  async vaildateCode(code: string) {
    const result = await this.notificationRepository.findOne({
      code,
      revokedAt: null,
    });

    this.notificationRepository.softDelete({ id: result.id });

    return !!result;
  }
}
