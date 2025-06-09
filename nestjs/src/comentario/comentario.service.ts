import { Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComentarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createComentarioDto: CreateComentarioDto) {
    const coment = await this.prisma.comentario.create({
      data: {
        conteudo: createComentarioDto.conteudo,
        usuarioID: createComentarioDto.usuarioID,
        avaliacaoID: createComentarioDto.avaliacaoID,
      },
    });
    return coment;
  }

  async findAll() {
    return await this.prisma.comentario.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.comentario.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateComentarioDto: UpdateComentarioDto) {
    return await this.prisma.comentario.update({
      where: {
        id: id,
      },
      data: {
        conteudo: updateComentarioDto.conteudo,
        usuarioID: updateComentarioDto.usuarioID,
        avaliacaoID: updateComentarioDto.avaliacaoID,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.comentario.delete({
      where: {
        id: id,
      },
    });
  }
}
