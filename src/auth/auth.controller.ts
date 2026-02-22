import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { FileInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @UseInterceptors(NoFilesInterceptor())
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    @UseInterceptors(NoFilesInterceptor())
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
