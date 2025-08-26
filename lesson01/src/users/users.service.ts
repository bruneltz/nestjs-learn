import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [{ id: 1, name: 'John Doe', role:'INTERN' }, { id: 2, name: 'Jane Doe' }];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const users = this.users.filter(user => user.role === role);
            
            if (users.length === 0) {
                throw new NotFoundException('No users with the specified role found');
            }

            return users;
        }

        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    create(user: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = { id: usersByHighestId[0].id + 1, ...user };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, userUpdate: UpdateUserDto) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return null;
        }
        this.users[userIndex] = { ...this.users[userIndex], ...userUpdate };
        return this.users[userIndex];
    }

    delete(id: number) {
        const removedUser = this.findOne(id);

        this.users = this.users.filter(user => user.id !== id);
    
        return removedUser;
    }
}
