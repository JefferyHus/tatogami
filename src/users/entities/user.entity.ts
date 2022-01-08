import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Project } from 'src/projects/entities/project.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({
  name: 'Users',
})
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  password: string;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  username: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  emailVerifiedAt?: Date;

  @Field(() => Profile)
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
  })
  profile: Profile;

  @Field(() => [Project])
  @OneToMany(() => Project, (project) => project.user, {
    cascade: true,
  })
  projects: Project[];

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
