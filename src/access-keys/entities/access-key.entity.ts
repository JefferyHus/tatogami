import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'AccessKeys' })
export class AccessKey extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({
    type: 'character varying',
    length: '100',
  })
  name: string;

  @Field(() => String)
  @Column({
    type: 'character varying',
    length: '100',
    unique: true,
  })
  public_key: string;

  @Field(() => String)
  @Column({
    type: 'character varying',
    length: '100',
    unique: true,
  })
  private_key: string;

  @Field(() => Int)
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
    default: null,
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
    default: null,
  })
  deletedAt!: Date;
}
