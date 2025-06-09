import React from 'react'
import { useEffect, useState } from 'react';
import { ProfessorData } from '../../types/Professor'; 
import { DisciplinaData } from '../../types/Disciplina'; 
import Link from "next/link";
import Image from "next/image";
import styles from '../../aa_extra/styles/feed.module.css';
import defaultFoto from '../../assets/fotodefaultprof.svg';
import { getAllDisciplinas } from '../../app/_api/disciplinaApi';

const Professor = ( Professor : ProfessorData) => {

  const [disciplinas, setDisciplinas] = useState<DisciplinaData[]>([]);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      const disciplinasData = await getAllDisciplinas();
      setDisciplinas(disciplinasData);
    };
    fetchDisciplinas();
  }, [])

  const disciplina = disciplinas.find(nome => nome.id === Professor.disciplinaID);
  const nomeDisciplina = disciplina ? disciplina.nome : "No discipline information available"

  return (
    <div className ="bg-white my-4 w-56 h-48 p-2 rounded-md flex flex-col justify-center items-center border-b-2 border-black">
      <div className="FotoProfessor">
        <Image src={
            Professor?.foto_perfil && typeof Professor.foto_perfil === "string"
            ? Professor.foto_perfil
            : defaultFoto
          } alt="Foto do Professor" 
          className = "w-36 h-24 rounded-xl" width={50} height={50}/>
      </div>
      
      <div className="nomeProfessor mt-2">
        <Link href={`/professores/${Professor.id}`}>
          <h1>{Professor.nome}</h1>
        </Link>
      </div>

      <div className='disciplinaProfessor font-light text-sm truncate'>
        <p>{nomeDisciplina}</p>
      </div>
    </div>
  )
}

export default Professor;