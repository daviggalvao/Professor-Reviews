import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { CurrentUser } from 'src/auth/decorators/CurrentUser.decorator';
import { UserPayload } from 'src/auth/types/UserPayload';
import { UnauthorizedException } from '@nestjs/common';
import { Public } from 'src/auth/decorators/isPublic.decorator';

@Controller('comentario')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Post()
  async create(
    @Body() createComentarioDto: CreateComentarioDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    if (createComentarioDto.usuarioID !== currentUser.sub) {
      throw new UnauthorizedException(
        'Avaliação não pode ser criada para outro usuário',
      );
    }
    return await this.comentarioService.create(createComentarioDto);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.comentarioService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.comentarioService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComentarioDto: UpdateComentarioDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const comentario = await this.comentarioService.findOne(id);
    if (comentario.usuarioID !== currentUser.sub) {
      throw new UnauthorizedException(
        'Avaliação não pode ser criada para outro usuário',
      );
    }
    return await this.comentarioService.update(id, updateComentarioDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const comentario = await this.comentarioService.findOne(id);
    if (comentario.usuarioID !== currentUser.sub) {
      throw new UnauthorizedException(
        'Avaliação não pode ser criada para outro usuário',
      );
    }
    return await this.comentarioService.remove(id);
  }
}
