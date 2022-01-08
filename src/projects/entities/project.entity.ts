import { Field, ID, ObjectType } from '@nestjs/graphql';
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
@Entity({ name: 'Projects' })
export class Project extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @Field(() => String)
  @Column({ type: 'character varying', length: 100 })
  name: string;

  @Field(() => String)
  @Column({ type: 'character varying', length: 150 })
  slug: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'character varying', length: 300 })
  description: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'character varying', length: 100 })
  thumbnail: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'character varying', length: 100 })
  url: string;

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
