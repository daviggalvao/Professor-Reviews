"use client";

import Image from "next/image";
import Link from "next/link";
import { AvaliacaoData } from '@/types/Avaliacao'; 
import defaultFoto from '../../../assets/fotodefault.svg';  // Caminho para a imagem local
import emailUser from '../../../assets/email.svg';
import courseUser from '../../../assets/courseuser.svg';
import leftArrow from '../../../assets/leftarrow.svg';

import { hookUser } from "@/hooks/hookUser";
import Header from "@/components/layout/Header";
import Avaliacao from "@/components/entidades/Avaliacao";

import Coment from "@/components/entidades/Comentario";
import {hookAvaliacao} from "@/hooks/hookAvaliacao"

import { deleteUser } from "@/app/_api/userApi";
import ModalPerfil from "@/components/modais/ModalPerfil";
import { useParams } from "next/navigation";
import { getAvaliacao } from "@/app/_api/avaliacaoApi";
import { useEffect, useState } from "react";
import Comentario from "@/app/comentarios/[id]/page";


export default function Avaliacoes() {

    const AAA = hookAvaliacao()?.Comentarios

    const { id } = useParams();
    console.log(id);

    const [avaliacao, setAvaliacao] = useState<AvaliacaoData | null>(null)

    const getAvaliacaoById = async () => {
        try {
            const avaliacao = await getAvaliacao(parseInt(id))
            console.log(avaliacao)
            setAvaliacao(avaliacao)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getAvaliacaoById()
    }, [])

  return (
    avaliacao ?
    <div>
        <Header/>

        <div className = "flex justify-center  flex-1 bg-white">
            
            <div>
                <Link href = "/">
                    <button>
                        <Image src = {leftArrow} alt = "return feed" width={50} height={50}/>
                    </button>
                </Link>
            </div>

            <div className = "bg-[#71FDC5] w-1/3 items-center border-2 border-green-400 flex flex-col min-h-screen rounded-xl mt-2">
                <Avaliacao key={avaliacao.id} {...avaliacao}/>
                { AAA && AAA.length > 0 ? (
                    AAA.map((coment) => (
                      <Coment key={coment.id} {...coment} />
                    ))
                  ) : (
                    <></>
                  )}
            </div>
        </div>
    </div> : <></>
  )
}
