import { Injectable } from '@nestjs/common';
import { Mongoose } from 'mongoose';

@Injectable()
export class MongoDBService {
  private mongoose: Mongoose;

  constructor() {
    this.mongoose = new Mongoose();
    this.initConnection();
  }

  async connect(): Promise<void> {
    try {
      await this.mongoose.connect(process.env.MONGO_DATABASE_URI, {
        dbName: process.env.MONGO_DATABASE_NAME,
        auth: {
          username: process.env.MONGO_INITDB_ROOT_USERNAME,
          password: process.env.MONGO_INITDB_ROOT_PASSWORD,
        },
      });
      console.log('Connection to MongoDB created successfully!');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  }

  getMongooseInstance(): Mongoose {
    return this.mongoose;
  }

  async initConnection() {
    if (!this.mongoose.connection.readyState) {
      await this.connect();
    }
  }
}
