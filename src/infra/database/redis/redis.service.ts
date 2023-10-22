import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private client: Redis;
  private readonly redisConfig = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times: number) => {
      if (times <= 3) return 1000; // 1s
      return null;
    },
  };

  constructor() {
    this.connect();
  }

  getClient(): Redis {
    console.log('RedisService:getClient');
    return this.client;
  }

  connect() {
    try {
      this.client = new Redis(this.redisConfig);
      console.log('Connection to Redis created successfully!');
    } catch (error) {
      console.error('Error connecting to Redis:', error.message);
    }
  }
}
