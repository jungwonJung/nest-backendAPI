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

import { Link } from 'src/link/link.entity';

export enum Type {
  ROUND_RECT = 'ROUND_RECT',
  RECT = 'RECT',
  SPECH_BUBBLE = 'SPECH_BUBBLE',
}

@Entity({ name: 'badge', schema: '아직미정' })
export class Badge extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'enum', enum: Type })
  type?: Type;

  @Column()
  color?: string;

  @Column()
  backGroundColor?: string;

  @Column()
  content?: string;

  @OneToOne(() => Link, (link) => link.badge, {
    primary: false,
  })
  link: Link;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
