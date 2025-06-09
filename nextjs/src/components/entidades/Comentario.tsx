import React from "react";
import Image from "next/image";
import { ComentarioData } from "@/types/Comentario";
import { hookUserID } from "@/hooks/hookUser";
import { hookAvaliacaoID } from "@/hooks/hookAvaliacao";

import { CanShowItem } from "@/utils/auth";
import ModalComentario from "../modais/ModalComentario";
import ModalEditComentario from "../modais/ModalEditComentario";
import defaultFoto from "../../assets/fotodefaultuser.svg";
import Link from "next/link";

const Comentario = (Comentario: ComentarioData) => {
  const user = hookUserID(Comentario.usuarioID);
  const aval = hookAvaliacaoID(Comentario.avaliacaoID);

  return (
    <div className="bg-green-500 rounded-3xl w-4/5 mt-5 mb-5">
      <div className="flex items-center gap-2">
        <Image
          src={
            user?.foto_perfil && typeof user.foto_perfil === "string"
              ? user.foto_perfil
              : defaultFoto
          }
          alt="Foto do Usuário"
          className=" ml-2 w-10 h-10 border-2 border-black rounded-full mt-4 mb-2"
          width={25}
          height={25}
        />

        <h3 className="text-xs font-bold">{user?.nome}</h3>

        <h4 className="text-xs font-light">
          {Comentario.createdAt
            ? new Date(Comentario.createdAt).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : "Date not available"}
        </h4>

        <h4 className="text-xs font-light">{aval?.professor.nome}</h4>
        <h4 className="text-xs font-light">{aval?.disciplina.nome}</h4>
      </div>

      <p className=" ml-12 font-medium text-sm mr-2">{Comentario.conteudo}</p>

      <div className="ml-12 flex items-center gap-2 mb-4">
        {/*<Image src = {commentUser} alt = "icone comentário" className = ""  width={25} height={25}/>


          <Link href={`/Avaliacoes/${Comentario.id}`}>
            <p className = "font-medium text-xs">{comentariosCount} comentário(s)</p>
          </Link>*/}
      </div>

      {CanShowItem(Comentario.usuarioID) ? (
        <div className="flex flex-row  gap-2 mr-10">
          <ModalEditComentario
            ComentarioID={Comentario.id}
          ></ModalEditComentario>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Comentario;
