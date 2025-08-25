import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [{ id: 1, name: 'John Doe', role:'INTERN' }, { id: 2, name: 'Jane Doe' }];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role);
        }

        return this.users;
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    create(user: { name: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = { id: usersByHighestId[0].id + 1, ...user };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, userUpdate: { name?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
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
