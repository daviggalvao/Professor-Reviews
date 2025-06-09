
import { ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Usuário já cadastrado com esse email');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.senha, 10);

    const user = await this.prisma.user.create({
      data: {
        nome: createUserDto.nome,
        email: createUserDto.email,
        senha: hashedPassword,
        curso: createUserDto.curso,
        departamento: createUserDto.departamento,
        foto_perfil: createUserDto.foto_perfil,
      },
    });
    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        curso: true,
        departamento: true,
        Avaliacoes: true,
        Comentarios: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number) {
    const isValidId = await this.prisma.user.findUnique({ where: { id } });
    if (!isValidId) {
      throw new NotFoundException(
        `O usuário com o id ${id} não foi encontrado`,
      );
    }
  
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        curso: true,
        departamento: true,
        Avaliacoes: {
          select: {
            id: true,
            conteudo: true,
            professorID: true, // Você pode manter a chave do professor se precisar, mas aqui não é necessário incluir diretamente.
            disciplinaID: true, // Pode ser mantido, mas você vai pegar o nome da disciplina com a relação.
            usuarioID: true,
            createdAt: true,
            updatedAt: true,
            // Relacionamentos para professor e disciplina:
            professor: { // A relação professor deve ser explicitada aqui.
              select: {
                nome: true, // Selecionando o nome do professor
              },
            },
            disciplina: { // A relação disciplina deve ser explicitada aqui.
              select: {
                nome: true, // Selecionando o nome da disciplina
              },
            },
            Comentarios: {
              select: {
                id: true,
                conteudo: true,
                usuarioID: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
        Comentarios: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  

  async findOneEmail(email: string){
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        Avaliacoes: {
          include: {
            Comentarios: true,
          },
        },
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log('chegou até aqui', updateUserDto)
    const isValidId = await this.prisma.user.findUnique({ where: { id } });
    if (!isValidId) {
      throw new NotFoundException(
        `O usuário com o id ${id} não foi encontrado`,
      );
    }
    console.log('chegou', updateUserDto)

    let hashedPassword = undefined
    if (updateUserDto.senha) {
        hashedPassword = await bcrypt.hash(updateUserDto.senha, 10);
    }

    console.log('chegou 2', updateUserDto)
    
    try{
     await this.prisma.user.update({
      where: {id: id,},
      data: {
        nome: updateUserDto.nome,
        email: updateUserDto.email,
        senha: hashedPassword,
        curso: updateUserDto.curso,
        departamento: updateUserDto.departamento,
        foto_perfil: updateUserDto.foto_perfil,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        curso: true,
        departamento: true,
        Avaliacoes: true,
        Comentarios: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    }catch (error){
      console.log(error)
    }
  }

  async remove(id: number) {
    const isValidId = await this.prisma.user.findUnique({ where: { id } });
    if (!isValidId) {
      throw new NotFoundException(
        `O usuário com o id ${id} não foi encontrado`,
      );
    }

    return await this.prisma.user.delete({
      where: {
        id: id,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        curso: true,
        departamento: true,
        Avaliacoes: true,
        Comentarios: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
