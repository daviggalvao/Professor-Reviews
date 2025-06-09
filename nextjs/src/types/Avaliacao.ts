import { ComentarioData } from '../types/Comentario'
import { ProfessorData } from './Professor';
import { DisciplinaData } from './Disciplina';

export interface AvaliacaoData {
  id?: number;

  conteudo: string;  

  professorID: number; 
  professor: ProfessorData;

  disciplinaID: number; 
  disciplina: DisciplinaData;

  usuarioID: number;
  Comentarios: ComentarioData[];

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateAvaliacao {
  conteudo?: string; 
}
  