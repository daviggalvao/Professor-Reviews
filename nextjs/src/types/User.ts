import { AvaliacaoData } from '../types/Avaliacao'

export interface UserData {
  id?: number;
  
  nome: string;
  email: string;
  senha: string;
  curso: string;
  departamento: string;
  foto_perfil: string | null;  // Caso o campo seja opcional ou nulo
  Avaliacoes?: AvaliacaoData[];

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateUser {
  nome?: string;
  email?: string;
  senha?: string;
  foto_perfil?: string | null;  // Caso o campo seja opcional ou nulo
}
  