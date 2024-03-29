import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { Post } from './posts/entities/post.entity';
import { PostsModule } from './posts/posts.module';
import { Profile } from './profiles/entities/profile.entity';
import { ProfilesModule } from './profiles/profiles.module';
import { Project } from './projects/entities/project.entity';
import { ProjectsModule } from './projects/projects.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AccessKeysModule } from './access-keys/access-keys.module';
import { AccessKey } from './access-keys/entities/access-key.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      port: Number(process.env.TYPEORM_PORT),
      synchronize: JSON.parse(process.env.TYPEORM_SYNCHRONIZE),
      entities: [User, Post, Profile, Project, AccessKey],
      migrations: [String(process.env.TYPEORM_MIGRATIONS_NEST)],
    }),
    GraphQLModule.forRoot({
      include: [
        UsersModule,
        AuthModule,
        PostsModule,
        ProfilesModule,
        ProjectsModule,
        AccessKeysModule,
      ],
      debug: true,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }) => ({ req }),
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    ProfilesModule,
    ProjectsModule,
    AccessKeysModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
