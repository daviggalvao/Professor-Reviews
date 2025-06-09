import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { ComentarioModule } from './comentario/comentario.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfessorModule } from './professor/professor.module';
import { DisciplinaService } from './disciplina/disciplina.service';
import { DisciplinaController } from './disciplina/disciplina.controller';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth-guard';

@Module({
  imports: [UserModule, AvaliacaoModule, ComentarioModule, PrismaModule, ProfessorModule, DisciplinaModule, AuthModule, 
            ConfigModule.forRoot({
                isGlobal: true,
              }),
           ],
  controllers: [AppController, DisciplinaController],
  providers: [AppService, { provide: 'APP_GUARD', useClass: AuthGuard }, DisciplinaService, PrismaService],
})
export class AppModule {}
