"use client";

import Image from "next/image";
import Link from "next/link";


import defaultFoto from '../../../assets/fotodefault.svg';  // Caminho para a imagem local
import emailUser from '../../../assets/email.svg';
import courseUser from '../../../assets/courseuser.svg';
import leftArrow from '../../../assets/leftarrow.svg';


import { hookUser } from "@/hooks/hookUser";
import Header from "@/components/layout/Header";
import Avaliacao from "@/components/entidades/Avaliacao";
import { deleteUser } from "@/app/_api/userApi";
import { setIsAuthenticated, setUser } from "@/hooks/hookUser";
import ModalPerfil from "@/components/modais/ModalPerfil";


export default function Comentario() {
  return (
          <div>
              <Header/>

              <div className = "flex justify-center  flex-1 bg-white">
                  
                  <div className = "">

                      <Link href = "/">
                          <button>
                              <Image src = {leftArrow} alt = "return feed" width={50} height={50}/>
                          </button>
                      </Link>
                  </div>

                  <div className = "bg-[#71FDC5] w-1/3 border-2 border-green-400 flex flex-col min-h-screen rounded-xl">

                  </div>
        </div>
      </div>
    </div>
  );
}
