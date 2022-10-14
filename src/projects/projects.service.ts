import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { User } from 'src/users/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  create(user: User, createProjectInput: CreateProjectInput): Promise<Project> {
    return this.projectRepository
      .create({
        user,
        ...createProjectInput,
        slug: slugify(createProjectInput.name),
      })
      .save();
  }

  findAll(user: User): Promise<Project[]> {
    return this.projectRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  findOne(id: number, user: User): Promise<Project> {
    return this.projectRepository.findOne(id, {
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  update(
    id: number,
    user: User,
    updateProjectInput: UpdateProjectInput,
  ): Promise<UpdateResult> {
    return this.projectRepository
      .createQueryBuilder()
      .update()
      .set({
        ...updateProjectInput,
        slug: slugify(updateProjectInput.name),
      })
      .where({
        id,
        user: {
          id: user.id,
        },
      })
      .returning('*')
      .execute();
  }

  remove(id: number, user: User): Promise<UpdateResult> {
    return this.projectRepository.softDelete({
      id,
      user: {
        id: user.id,
      },
    });
  }
}
