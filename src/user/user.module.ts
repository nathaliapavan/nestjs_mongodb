import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongoDBService } from './mongodb.service';

@Module({
  providers: [UserService, MongoDBService],
  controllers: [UserController],
})
export class UserModule {}
