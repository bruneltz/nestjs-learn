import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    //The order of endpoints matters. More specific routes should be defined before less specific ones.

    @Get() // GET /users
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role);
    }

    @Get(':id') // GET /users/1
    findOne(@Param('id') id: string ) {
        return this.usersService.findOne(+id);// Unary plus operator converts string to number
    }

    @Post() // POST /users
    create(@Body() users: { name: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        return this.usersService.create(users);
    }

    @Patch(':id') // PUT /users/1
    update(@Param('id') id: string, @Body() userUpdate: { name?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        return this.usersService.update(+id, userUpdate);
    }

    @Delete(':id') // DELETE /users/1
    delete(@Param('id') id: string ){
        return this.usersService.delete(+id);
    }

}
