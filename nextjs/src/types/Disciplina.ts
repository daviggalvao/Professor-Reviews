// src/types/Disciplina.ts
export interface DisciplinaData {
  id?: number; 

  nome: string; 
  professorID: number; 

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateDisciplina {
  professorID?: string;
}
  