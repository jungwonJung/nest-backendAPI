import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length } from 'class-validator';

@Entity({ name: 'notification', schema: '아직 미정' })
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  recipients: string[];

  @Column()
  content: string;

  @Column()
  @Length(6)
  code?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 삭제된 날짜 ( 인증완료 시간 )
  @DeleteDateColumn()
  revokedAt: Date;
}
