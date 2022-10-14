import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import marked from 'marked';
import readingTime from 'reading-time';
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
        tags: data.tags,
        reading_time: readingTime(data.original_markdown).text,
        author: {
          id: user.id,
        },
      })
      .save();
  }

  findAll(user: User): Promise<Post[]> {
    return this.postRepository.find({
      where: {
        author: {
          id: user.id,
        },
      },
    });
  }

  findOne(id: number, user: User): Promise<Post> {
    return this.postRepository.findOne(id, {
      where: {
        author: {
          id: user.id,
        },
      },
    });
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
    post.tags = data.tags || post.tags;
    post.reading_time = readingTime(data.original_markdown).text;

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
