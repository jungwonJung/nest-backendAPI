import {
  Entity,
  Column,
  OneToOne,
  ManyToOne,
  BaseEntity,
  JoinColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Badge } from 'src/badge/entities/badge.entity';
import { Account } from 'src/account/account.entity';

@Entity({ name: 'link', schema: '얘도 미정' })
export class Link extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  title: string;

  @Column()
  href: string;

  @Column()
  price: number;

  @Column()
  activated: boolean;

  @Column()
  count: number;

  @Column()
  startedAt: number;

  @Column()
  endedAt?: number;

  @Column()
  assetId: string;

  @ManyToOne(() => Account, (account) => account.link, {
    primary: false,
  })
  @JoinColumn({ name: 'accountId', referencedColumnName: '_id' })
  account: Account;

  @OneToOne(() => Badge, (badge) => badge.link, {
    primary: false,
  })
  @JoinColumn({ name: 'badgeId' })
  badge: Badge;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
