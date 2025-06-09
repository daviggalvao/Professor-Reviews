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
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { ValidationPipe } from '@nestjs/common';
import { Public } from 'src/auth/decorators/isPublic.decorator';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Public()
  @Post()
  async create(@Body(ValidationPipe) createProfessorDto: CreateProfessorDto) {
    return await this.professorService.create(createProfessorDto);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.professorService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.professorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateProfessorDto,
  ) {
    return this.professorService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.professorService.remove(id);
  }
}
