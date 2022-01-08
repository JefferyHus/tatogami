import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { FindProjectInput } from './dto/find-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Project)
  createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
    @CurrentUser() user: User,
  ) {
    return this.projectsService.create(user, createProjectInput);
  }

  @Query(() => [Project], { name: 'projects' })
  findAll(@Args('findProjectInput') findProjectInput: FindProjectInput) {
    return this.projectsService.findAll(findProjectInput);
  }

  @Query(() => Project, { name: 'project' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.projectsService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Project)
  updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
    @CurrentUser() user: User,
  ) {
    return this.projectsService
      .update(updateProjectInput.id, user, updateProjectInput)
      .then((result) => {
        return result.raw[0];
      });
  }

  @Mutation(() => Project)
  removeProject(@Args('id', { type: () => Int }) id: number) {
    return this.projectsService.remove(id);
  }
}
