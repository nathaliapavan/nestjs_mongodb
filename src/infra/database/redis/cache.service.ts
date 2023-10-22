import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';

@Injectable()
export class CacheService {
  constructor(private readonly redisService: RedisService) {}

  async get(key: string): Promise<string | null> {
    try {
      return this.redisService.getClient().get(key);
    } catch (error) {
      console.error('Error creating Redis:', error.message);
      return null;
    }
  }

  async set(key: string, value: string): Promise<void> {
    try {
      await this.redisService.getClient().set(key, value);
    } catch (error) {
      console.error('Error updating Redis:', error.message);
      return null;
    }
  }

  async delete(key: string): Promise<number> {
    try {
      return this.redisService.getClient().del(key);
    } catch (error) {
      console.error('Error deleting from Redis:', error.message);
      return null;
    }
  }
}
