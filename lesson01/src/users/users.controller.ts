import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    //The order of endpoints matters. More specific routes should be defined before less specific ones.

    @Get() // GET /users
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role);
    }

    @Get(':id') // GET /users/1
    findOne(@Param('id', ParseIntPipe) id: number ) {
        return this.usersService.findOne(id);// Unary plus operator converts string to number
    }

    @Post() // POST /users
    create(@Body(ValidationPipe ) users: CreateUserDto) {
        return this.usersService.create(users);
    }

    @Patch(':id') // PUT /users/1
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UpdateUserDto) {
        return this.usersService.update(id, userUpdate);
    }

    @Delete(':id') // DELETE /users/1
    delete(@Param('id', ParseIntPipe) id: number ){
        return this.usersService.delete(id);
    }

}
