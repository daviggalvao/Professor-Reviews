"use client";

import Image from "next/image";
import Link from "next/link";

import defaultFoto from '../../../assets/fotodefaultprof.svg';  // Caminho para a imagem local
import courseUser from '../../../assets/courseuser.svg';
import leftArrow from '../../../assets/leftarrow.svg';
import book from '../../../assets/book.svg';
import { hookProfessor } from "@/hooks/hookProfessores";
import { useState, useEffect } from 'react';

import { DisciplinaData } from '../../../types/Disciplina'; 
import { getAllDisciplinas } from '../../../app//_api//disciplinaApi';

import { AvaliacaoData } from '../../../types/Avaliacao';
import { getAllAvaliacoes } from "@/app/_api/avaliacaoApi";

import Header from "@/components/layout/Header";
import Avaliacao from "@/components/entidades/Avaliacao";

export default function Perfilprofessor() {

    const professor = hookProfessor();

    const [disciplinas, setDisciplinas] = useState<DisciplinaData[]>([]);
    const [avaliacoes, setAvaliacoes] = useState<AvaliacaoData[]>([]);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const disciplinasData = await getAllDisciplinas();
            setDisciplinas(disciplinasData);
            const avaliacoesData = await getAllAvaliacoes();
            if (Array.isArray(avaliacoesData)) {
                setAvaliacoes(avaliacoesData);
              } else {
                console.log("Error: evaluation data is not an array", avaliacoesData);
              }
          } catch(error) {
            console.log("Data not found.");
          }
        };
        fetchData();

      }, [])
    
      const disciplina = disciplinas.find(nome => nome.id === professor?.disciplinaID);
      const nomeDisciplina = disciplina ? disciplina.nome : "No course information" 
      const avaliacaovect = Array.isArray(avaliacoes) ? avaliacoes.filter(avaliacao => avaliacao.professor === professor?.nome) : []; 

      console.log(avaliacaovect);
                
    if (!professor) {
        return <p>Loading...</p>; // Shows something while data is being loaded
    }
    else {
        return (
            <div>
                <Header/>

                <div className = "flex justify-center  flex-2 bg-white">
                    
                    <div className = "">

                        <Link href = "/">
                            <button>
                                <Image src = {leftArrow} alt = "return feed" width={50} height={50}/>
                            </button>
                        </Link>
                    </div>

                    <div className = "bg-[#71FDC5] w-1/3 border-2 border-green-400 flex flex-col min-h-screen rounded-xl mt-2">

                        <div className = "flex flex-col items-center justify-center bg-white-100 w-full h-1/4 border-b-2 border-green-600">

                            <div className = "">

                                <div className = "flex flex-col items-center w-full">
                                    <Image src={
                                        professor?.foto_perfil && typeof professor.foto_perfil === "string"
                                        ? professor.foto_perfil
                                        : defaultFoto
                                        } alt="Foto do professor" 
                                        className= "w-32 h-32 border-4 border-black rounded-full mt-5 mb-2" width={50} height={50}/>
                                    <h1 className = "text-xl font-bold mb-1">{professor.nome}</h1>
                                </div>

                <div className="flex items-center gap-1">
                  <Image
                    src={courseUser}
                    alt="icone departamento"
                    className=""
                    width={25}
                    height={25}
                  />
                  <h2 className="text-xs mb-1">{professor.departamento}</h2>
                </div>

                <div className="flex items-center gap-1 mb-5">
                  <Image
                    src={book}
                    alt="icone disciplinas"
                    className=""
                    width={25}
                    height={25}
                  />
                  <h2 className="text-xs">{nomeDisciplina}</h2>
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-1 items-center">
              <h1 className="text-xl font-bold ml-4 mt-4">Reviews</h1> 
                {professor.Avaliacoes && professor.Avaliacoes.length > 0 ? (
                  professor.Avaliacoes.map((avaliacao) => (
                    <Avaliacao key={avaliacao.id} {...avaliacao} />
                  ))
                ) : (
                  <h2>No reviews found for this teacher.</h2>
                )} 
            </div>
          </div>
        </div>
      </div>
    );
  }
}
