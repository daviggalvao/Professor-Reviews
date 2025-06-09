import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from '../auth/decorators/isPublic.decorator';

import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { LoginUserDto } from 'src/user/dto/login-user.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async Login(@Body() dto: LoginUserDto): Promise<any>  {
        const result = await this.authService.Login(dto);
        return result;
    }
     
    @Public()
    @Post('register')
    async Register(@Body() dto: CreateUserDto) {
        const user = await this.authService.Register(dto);
        return user;
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
