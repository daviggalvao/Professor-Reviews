import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { CurrentUser } from 'src/auth/decorators/CurrentUser.decorator';
import { UserPayload } from 'src/auth/types/UserPayload';
import { Public } from 'src/auth/decorators/isPublic.decorator';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  async create(
    @Body() createAvaliacaoDto: CreateAvaliacaoDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    if (createAvaliacaoDto.usuarioID !== currentUser.sub) {
      throw new UnauthorizedException(
        'Avaliação não pode ser criada para outro usuário',
      );
    }
    return await this.avaliacaoService.create(createAvaliacaoDto);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.avaliacaoService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.avaliacaoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAvaliacaoDto: UpdateAvaliacaoDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const avaliacao = await this.avaliacaoService.findOne(id);
    if (avaliacao.usuarioID !== currentUser.sub) {
      throw new UnauthorizedException(
        'Avaliação não pode ser criada para outro usuário',
      );
    }
    return this.avaliacaoService.update(id, updateAvaliacaoDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const avaliacao = await this.avaliacaoService.findOne(id);
    if (avaliacao.usuarioID !== currentUser.sub) {
      throw new UnauthorizedException(
        'Avaliação não pode ser criada para outro usuário',
      );
    }

    return await this.avaliacaoService.remove(id);
  }
}
