import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PostService {
  private posts = [];

  async createPost(body: any): Promise<any> {
    this.posts.push(body);
    return body;
  }

  async findPost(id: string): Promise<any> {
    const post = this.posts.find((post) => post.id === id);
    if (!post)
      throw new NotFoundException(`Post with email id:${id} not found `);
    return post;
  }

  async listPost(): Promise<any[]> {
    return this.posts;
  }

  async updatePost(id: string, body: any): Promise<any> {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) return null;
    this.posts[postIndex] = { ...this.posts[postIndex], ...body };
    return this.posts[postIndex];
  }

  async deletePost(id: string): Promise<void> {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) return null;
    const deletedPost = this.posts.splice(postIndex, 1);
    return deletedPost[0];
  }
}
