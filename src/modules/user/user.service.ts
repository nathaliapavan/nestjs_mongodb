import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserSchema } from './model/user.schema';
import { Model } from 'mongoose';
import { CreateUserInput, UpdateUserInput } from './model/user.input';
import { UserPayload } from './model/user.payload';
import { MongoDBService } from '../../infra/database/mongodb/mongodb.service';
import { CacheService } from '../../infra/database/redis/cache.service';

@Injectable()
export class UserService {
  private userModel: Model<User>;

  constructor(
    private readonly mongoDBService: MongoDBService,
    private readonly cacheService: CacheService,
  ) {
    this.userModel = this.mongoDBService
      .getMongooseInstance()
      .model(User.name, UserSchema);
  }

  async createUser(body: CreateUserInput): Promise<UserPayload> {
    const createdUser = new this.userModel(body);
    const user = await createdUser.save();
    await this.cacheService.set(`user:${user.id}`, JSON.stringify(user));
    return user;
  }

  async findUser(id: string): Promise<UserPayload> {
    try {
      const cachedUser = await this.cacheService.get(`user:${id}`);
      if (cachedUser) {
        const user = JSON.parse(cachedUser);
        console.log(`${user._id} from Redis`);
        return user;
      }
      return this.getUserByMongoDB(id);
    } catch (error) {
      console.error('Error accessing Redis:', error.message);
      return this.getUserByMongoDB(id);
    }
  }

  async listUser(): Promise<UserPayload[]> {
    const users = await this.userModel.find();
    return users;
  }

  async updateUser(id: string, body: UpdateUserInput): Promise<UserPayload> {
    await this.userModel.updateOne({ _id: id }, body);
    const updatedUser = await this.userModel.findById(id);
    if (updatedUser) {
      await this.cacheService.set(`user:${id}`, JSON.stringify(updatedUser));
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.cacheService.delete(`user:${id}`);
    await this.userModel.deleteOne({ _id: id });
  }

  private async getUserByMongoDB(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User with id:${id} not found `);
    }
    console.log(`${user.id} from MongoDB`);
    return user;
  }
}
