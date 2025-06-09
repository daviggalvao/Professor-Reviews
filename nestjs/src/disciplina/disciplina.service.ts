import { Injectable } from '@nestjs/common';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class DisciplinaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDisciplinaDto: CreateDisciplinaDto) {
    const disciplina = await this.prisma.disciplina.create({
      data: {
            nome: createDisciplinaDto.nome,
      },
    });
    return disciplina;
  }

  async findAll() {
    return await this.prisma.disciplina.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.disciplina.findUnique({
      where: { 
        id : id, 
      },
    });
  }

  async update(id: number, updateDisciplinaDto: UpdateDisciplinaDto) {
    return await this.prisma.disciplina.update({
      where: { 
        id : id, 
      },
      data: {
        nome: updateDisciplinaDto.nome,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.disciplina.delete({
      where: { 
        id : id, 
      },
    });
  }
}
