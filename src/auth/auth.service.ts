import { Injectable } from '@nestjs/common';

import { AccountService } from 'src/account/account.service';

@Injectable()
export class AuthService {
  constructor(private readonly accountService: AccountService) {}

  validateAccount = async (id: string) => await this.accountService.find(id);
}
