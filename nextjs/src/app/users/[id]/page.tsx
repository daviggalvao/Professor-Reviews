"use client";

import Image from "next/image";
import Link from "next/link";


import defaultFoto from '../../../assets/fotodefaultuser.svg';  // Caminho para a imagem local
import emailUser from '../../../assets/email.svg';
import courseUser from '../../../assets/courseuser.svg';
import leftArrow from '../../../assets/leftarrow.svg';

import { CanShowItem } from "@/utils/auth";
import { hookUser } from "@/hooks/hookUser";
import Header from "@/components/layout/Header";
import Avaliacao from "@/components/entidades/Avaliacao";
import { deleteUser } from "@/app/_api/userApi";
import { handleLogout } from "@/utils/auth";
import ModalPerfil from "@/components/modais/ModalPerfil";


export default function PerfilAluno() {
  const user = hookUser();              
  const delRed = async () => {
    try {
      await deleteUser(user.id);
      handleLogout();
    } catch (error) {}
  };

    if (!user) {
        return <p>Loading...</p>; // Shows something while User data is being loaded
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
                <div className = "flex flex-col justify-center bg-white-100 w-full h-1/4 border-b-2 border-green-600">
                  <div className = "ml-10">
                    <div className = "flex items-center justify-between w-full">
                      <Image src={ user?.foto_perfil && typeof user.foto_perfil === "string" ? user.foto_perfil: defaultFoto} 
                      alt="Foto de Usuario" className= "w-32 h-32 border-4 border-black rounded-full mt-5 mb-2" width={50} height={50}/>
                        
                      {CanShowItem(user?.id)? (
                        <div className = "flex flex-col mr-10">
                          <ModalPerfil></ModalPerfil>
                          <button onClick={delRed} 
                          className = "text-black bg-red-400 px-1 py-1 rounded-2xl w-30 h-8 flex justify-center items-center cursor-pointer text-lg border-b-2 border-black font-light">Delete profile</button>
                        </div>
                      ): (
                        <div>                                      

                        </div>
                      )}
                    </div>

                    <div>
                      <h1 className = "text-xl font-bold mb-1">{user.nome}</h1>
                    </div>

                    <div className="flex items-center gap-1">
                      <Image
                        src={courseUser}
                        alt="icone curso/departamento"
                        className=""
                        width={25}
                        height={25}
                      />
                      <h2 className="text-xs mb-1">{user.curso}</h2>
                      <h2 className = "text-xs mb-1">{user.departamento}</h2>
                    </div>

                    <div className="flex items-center gap-1 mb-5">
                      <Image
                        src={emailUser}
                        alt="icone email"
                        className=""
                        width={25}
                        height={25}
                      />
                      <h2 className="text-xs">{user.email}</h2>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col flex-1 items-center">
                  <h1 className="text-xl font-bold ml-4 mt-4">Publications</h1>
                  {user.Avaliacoes && user.Avaliacoes.length > 0 ? (
                    user.Avaliacoes.map((avaliacao) => (
                      <Avaliacao key={avaliacao.id} {...avaliacao} />
                    ))
                  ) : (
                    <h2>This user has not made any publications</h2>
                  )} 
                </div>
              </div>
            </div>
          </div>
        );
    }
}
