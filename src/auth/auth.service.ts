import { Injectable, Post, Body, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { username: loginDto.username }
        });
        if (!user) {
            throw new NotFoundException('Username tidak ditemukan');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
           throw new UnauthorizedException('Password salah');
        }

         const payload = { 
            id_user: user.id, 
            username: user.username,
            role: user.role
        };

        return {
            message: 'Login berhasil',
            token: await this.jwtService.signAsync(payload)
        };
    }

    async register(registerDto: RegisterDto) {

        const existingUser = await this.prisma.user.findUnique({
            where: { username: registerDto.username }
        });
        if (existingUser) {
            throw new NotAcceptableException('Username sudah digunakan');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        await this.prisma.user.create({
            data: {
                ...registerDto,
                password: hashedPassword
            }
        });
        return 'User berhasil didaftarkan';
    }
}
