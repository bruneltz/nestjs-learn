import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    //The order of endpoints matters. More specific routes should be defined before less specific ones.

    @Get() // GET /users
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): string {
        return 'This action returns all users with role: ' + role;
    }

    @Get(':id') // GET /users/1
    findOne(@Param('id') id: string ): string {
        return 'This action returns a user by id: ' + id;
    }

    @Post() // POST /users
    create(@Body() users: {}) {
        return users
    }

    @Patch(':id') // PUT /users/1
    update(@Param('id') id: string, @Body() userUpdate: {}) {
        return { id, ...userUpdate };
    }

    @Delete(':id') // DELETE /users/1
    delete(@Param('id') id: string ): string {
        return 'Deleted id: ' + id;
    }

}
