import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    tampilkanuser() {
        return this.userService.tampilkanuser();
    }
}
