import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token tidak ditemukan');
    }

    console.log('🔍 Token yang diterima:', token);

    try {
      const payload = await this.jwtService.verifyAsync(token)
      console.log('✅ Token verified berhasil:', payload);
      
      request['user'] = payload;
    } catch (error: any) {
      console.log('❌ Error saat verify token:', error.message);
      throw new UnauthorizedException('Token tidak valid atau kadaluwarsa');
    }
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}