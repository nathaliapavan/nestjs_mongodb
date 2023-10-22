import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';

@Controller({
  path: 'posts',
  version: '1',
})
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(@Body() body: any) {
    return this.postService.createPost(body);
  }

  @Get('/list')
  listPost() {
    return this.postService.listPost();
  }

  @Get('/:id')
  findPost(@Param('id') id: string) {
    return this.postService.findPost(id);
  }

  @Put('/:id')
  updatePost(@Param('id') id: string, @Body() body: any) {
    return this.postService.updatePost(id, body);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
