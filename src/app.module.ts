import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
