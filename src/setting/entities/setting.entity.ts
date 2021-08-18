import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Account } from 'src/account/account.entity';

export enum ViewType {
  //! modify, Spell.  ok
  LIST = 'LIST',
  CARD = 'CARD',
}

export enum Language {
  //! modify, Spell.  ok
  KO = 'KO',
  EN = 'EN',
}

@Entity({ name: 'setting', schema: '아직미정' })
export class Setting extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ default: true })
  agreementMarketing: boolean;

  @Column({ type: 'enum', enum: ViewType, default: 'LIST' })
  viewtype: ViewType;

  @Column({ type: 'enum', enum: Language, default: 'KO' })
  language: Language;

  @OneToOne(() => Account, (account) => account.setting, {
    primary: false,
  })
  @JoinColumn({ name: 'accountId' })
  account: Account;
}
