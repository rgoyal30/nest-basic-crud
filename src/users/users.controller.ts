import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('create')
  create(@Body() user: User) {
    return this.usersService.create(user);
  }


  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() user: User) {
    return this.usersService.update(id, user);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
