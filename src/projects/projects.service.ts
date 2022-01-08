import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { User } from 'src/users/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { FindProjectInput } from './dto/find-project.input';
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

  findAll(findProjectInput: FindProjectInput): Promise<Project[]> {
    return this.projectRepository.find({
      where: {
        user: {
          id: findProjectInput.userId,
        },
      },
    });
  }

  findOne(id: number): Promise<Project> {
    return this.projectRepository.findOne(id);
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

  remove(id: number) {
    return this.projectRepository.softDelete(id);
  }
}
