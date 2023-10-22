import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongoDBService } from '../../infra/database/mongodb/mongodb.service';
import { CacheService } from './../../infra/database/redis/cache.service';
import { RedisService } from './../../infra/database/redis/redis.service';

@Module({
  providers: [UserService, MongoDBService, RedisService, CacheService],
  controllers: [UserController],
})
export class UserModule {}
