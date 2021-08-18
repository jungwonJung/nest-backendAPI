import {
  Column,
  Entity,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Exception extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  path: string;

  @Column()
  description: string;

  @Column('json', { nullable: true })
  body?: object;

  @CreateDateColumn()
  createdAt: Date;
}
