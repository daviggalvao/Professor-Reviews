export interface ComentarioData {
  id?: number; 
  
  conteudo: string; 
  usuarioID: number; 
  avaliacaoID: number; 

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateComentario {
  conteudo?: string; // Texto do comentário
}
  