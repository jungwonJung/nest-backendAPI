import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity({ name: 'snslink', schema: '아직미정' })
export class SNSLink extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  youtube?: string;

  @Column()
  instagram?: string;

  @Column()
  facebook?: string;

  @Column()
  naverBlog?: string;

  @Column()
  website?: string;

  @OneToOne(() => Profile, (profile) => profile.sns, {
    primary: false,
  })
  profile: Profile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt?: Date;
}
