import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserInput } from './model/user.input';
import { UserService } from './user.service';

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: CreateUserInput) {
    try {
      return this.userService.createUser(body);
    } catch (error) {
      new HttpException(error.message, error.statusCode);
    }
  }

  @Get('/list')
  listUser() {
    try {
      return this.userService.listUser();
    } catch (error) {
      new HttpException(error.message, error.statusCode);
    }
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    try {
      return this.userService.findUser(id);
    } catch (error) {
      new HttpException(error.message, error.statusCode);
    }
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: CreateUserInput) {
    try {
      return this.userService.updateUser(id, body);
    } catch (error) {
      new HttpException(error.message, error.statusCode);
    }
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    try {
      return this.userService.deleteUser(id);
    } catch (error) {
      new HttpException(error.message, error.statusCode);
    }
  }
}
