import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Link } from 'src/link/link.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Setting } from 'src/setting/entities/setting.entity';

@Entity({ name: 'account', schema: '아직 미정' })
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ unique: true })
  uid: string;

  @Column()
  birth: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @OneToOne(() => Profile, (profile) => profile.account, {
    primary: false,
  })
  profile?: Profile;

  @OneToOne(() => Setting, (setting) => setting.account, {
    primary: false,
  })
  setting?: Setting;

  @OneToMany(() => Link, (link) => link.account, {
    primary: false,
  })
  link: Link[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
