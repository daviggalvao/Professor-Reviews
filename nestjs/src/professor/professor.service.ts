import { Injectable } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ProfessorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProfessorDto: CreateProfessorDto) {
    const professor = await this.prisma.professor.create({
      data: {
        nome: createProfessorDto.nome,
        departamento: createProfessorDto.departamento,
        disciplinaID: createProfessorDto.disciplinaID,
      },
    });
    return professor;
  }

  async findAll() {
    return await this.prisma.professor.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.professor.findUnique({
      where: { 
        id: id,
      },
      select: {
        nome: true,
        departamento: true,
        disciplinaID: true,
        disciplina: {
          select: {
            nome: true, // Nome da disciplina
          },
        },
        Avaliacoes: {
          select: {
            id: true,
            conteudo: true,
            professorID: true,
            disciplinaID: true,
            usuarioID: true,
            createdAt: true,
            updatedAt: true,
            disciplina: {
              select: {
                nome: true, // Nome da disciplina associada à avaliação
              },
            },
            professor: {
              select: {
                nome: true, // Nome do professor associado à avaliação
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
      },
    });
  }
  

  async update(id: number, updateProfessorDto: UpdateProfessorDto) {
    return await this.prisma.professor.update({
      where: { 
        id : id, 
      },
      data: {
        nome: updateProfessorDto.nome,
        departamento: updateProfessorDto.departamento,
        disciplinaID: updateProfessorDto.disciplinaID,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.professor.delete({
      where: { 
        id : id, 
      },
    });
  }
}
