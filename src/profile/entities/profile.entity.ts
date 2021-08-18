import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { SNSLink } from './sns.entity';
import { Account } from 'src/account/account.entity';

@Entity({ name: 'profile', schema: '아직 미정' })
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  name?: string;

  @Column()
  bio?: string;

  @Column()
  assetId?: string;

  @OneToOne(() => Account, (account) => account.profile, {
    primary: false,
  })
  @JoinColumn({ name: 'accountId' })
  account?: Account;

  @OneToOne(() => SNSLink, (snslink) => snslink.profile, {
    primary: false,
  })
  @JoinColumn({ name: 'snsLinkId' })
  sns?: SNSLink;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt?: Date;
}
