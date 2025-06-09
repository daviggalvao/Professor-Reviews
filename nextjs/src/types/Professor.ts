import { AvaliacaoData } from '../types/Avaliacao'

export interface ProfessorData {
  id?: number; 

  nome: string; 
  departamento: string; 
  disciplinaID?: number;
  foto_perfil: string | null; 
  Avaliacoes?: AvaliacaoData[];

  createdAt: Date;
  updatedAt?: Date;
}

export interface UpdateProfessor {
  nome?: string; 
  email?: string; 
  DisciplinaID?: string;
  foto_perfil?: string | null;
}

  