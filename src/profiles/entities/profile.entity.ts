import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
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

@ObjectType()
@Entity({ name: 'Profiles' })
export class Profile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @Field(() => String)
  @Column({
    type: 'character varying',
    length: 100,
  })
  fullname: string;

  @Field(() => String, {
    nullable: true,
  })
  @Column({
    type: 'character varying',
    length: 500,
    nullable: true,
  })
  biography: string;

  @Field(() => String, {
    nullable: true,
  })
  @Column({
    type: 'character varying',
    length: 30,
    nullable: true,
  })
  phone: string;

  @Field(() => String, {
    nullable: true,
  })
  @Column({
    type: 'character varying',
    length: 200,
    nullable: true,
  })
  location: string;

  @Field(() => Number, {
    nullable: true,
  })
  @Column({
    type: 'int',
    nullable: true,
  })
  years_of_experience: number;

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
