import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { LoginUserDto } from 'src/user/dto/login-user.dto'
import { JwtService } from '@nestjs/jwt';
import { register } from 'module';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserToken } from './types/UserToken';
import { UserPayload } from './types/UserPayload';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {} 
  
  async Login(dto: LoginUserDto): Promise<{ token: string; user: any }> {
    const user = await this.validateUser(
      dto.email,
      dto.senha,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload: UserPayload = { email: user.email, sub: user.id };
    const jwtToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: this.configService.get('JWT_SECRET'),
    });

    return {
      token: jwtToken,
      user: user,
    };
  }
  
  async validateUser(email: string, senha: string) {
    const user = await this.usersService.findOneEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (isPasswordValid) {
        return {
          ...user,
          senha: undefined,
        };
      }
    }
    return null;
  }

  async Register(dto: CreateUserDto): Promise<{}> {
    const user = await this.usersService.create(dto);
    return user;
  }
}

