import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PrismaService } from 'src/prisma/prisma.service';

import { UserService } from 'src/user/user.service';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoginValidationMiddleware } from './middleware/LoginValidationMiddleware.middleware';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService],
  exports: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})

export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
