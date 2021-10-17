import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as marked from 'marked';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  create(data: CreatePostInput, user: User): Promise<Post> {
    return this.postRepository
      .create({
        title: data.title,
        original_markdown: data.original_markdown,
        parsed_markdown: marked(data.original_markdown),
        author: {
          id: user.id,
        },
      })
      .save();
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findOne(id: number): Promise<Post> {
    return this.postRepository.findOne(id);
  }

  async update(id: number, data: UpdatePostInput, user: User): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: {
        id,
        author: {
          id: user.id,
        },
      },
    });

    post.title = data.title || post.title;
    post.original_markdown = data.original_markdown || post.original_markdown;
    post.parsed_markdown = marked(post.original_markdown);

    return post.save({
      reload: true,
    });
  }

  async remove(id: number): Promise<number> {
    const deleteResult = await this.postRepository.delete({
      id,
    });

    return deleteResult.affected;
  }
}
