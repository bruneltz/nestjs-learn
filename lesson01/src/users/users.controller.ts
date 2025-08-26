import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe, Ip } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@Controller('users')
@SkipThrottle()
export class UsersController {

    constructor(private readonly usersService: UsersService) {}
    private readonly logger = new MyLoggerService(UsersController.name);

    //The order of endpoints matters. More specific routes should be defined before less specific ones.

    @SkipThrottle({ default: false })
    @Get() // GET /users
    findAll(@Ip() ip: string, @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        this.logger.log('Fetching all users', UsersController.name);
        return this.usersService.findAll(role);
    }

    @Throttle({short: {ttl: 1000, limit: 1}}) // Limit to 1 request per second
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
