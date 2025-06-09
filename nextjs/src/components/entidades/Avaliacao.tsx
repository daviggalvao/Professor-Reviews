import React from "react";
import { AvaliacaoData } from "../../types/Avaliacao";
import { hookUserID } from "@/hooks/hookUser";
import Link from "next/link";
import Image from "next/image";

import lixeira from "../../assets/lixo.svg";
import commentUser from "../../assets/comment.svg";
import ModalComentario from "../modais/ModalComentario";
import ModalEditComentario from "../modais/ModalEditComentario";
import defaultFoto from "../../assets/fotodefaultuser.svg"; // Caminho para a imagem local
import { deleteAvaliacao } from "@/app/_api/avaliacaoApi";
import { CanShowItem } from "@/utils/auth";
import ModalEditAvaliação from "../modais/modalEditAvaliação";

const Avaliacao = (Avaliacao: AvaliacaoData) => {
  const user = hookUserID(Avaliacao.usuarioID);
  const comentariosCount = Array.isArray(Avaliacao.Comentarios)
    ? Avaliacao.Comentarios.length
    : 0;

  // arrumar a funcao de apagar a avalicao
  const delAv = async () => {
    try {
      await deleteAvaliacao(Avaliacao.id);
    } catch (error) {}
  };

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

        <Link href={`/users/${user?.id}`}>
          <h3 className="text-xs font-bold">{user?.nome ?? "abc "}</h3>
        </Link>
        <h4 className="text-xs font-light">
          {Avaliacao.createdAt
            ? new Date(Avaliacao.createdAt).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : "Date not available"}
        </h4>

        <Link href={`/professores/${Avaliacao.professorID}`}>
          <h4 className="text-xs font-light">{Avaliacao.professor.nome}</h4>
        </Link>
        <h4 className="text-xs font-light">{Avaliacao.disciplina.nome}</h4>
      </div>

      <p className=" ml-12 font-medium text-sm mr-2">{Avaliacao.conteudo}</p>

      <div className="ml-12 flex items-center gap-2 mb-4">
        <Image
          src={commentUser}
          alt="icone comentário"
          className=""
          width={25}
          height={25}
        />
        <Link href={`/Avaliacoes/${Avaliacao.id}`}>
          <p className="font-medium text-xs">
            {comentariosCount} comment(s)
          </p>
        </Link>

        {CanShowItem(Avaliacao.usuarioID) ? (
          <div className="flex flex-row  gap-2 mr-10">
            <ModalComentario avaliacaoID={Avaliacao.id}></ModalComentario>
            <ModalEditAvaliação avaliacaoID={Avaliacao.id}></ModalEditAvaliação>
          </div>
        ) : (
          <div className="flex flex-row mr-30">
            <ModalComentario avaliacaoID={Avaliacao.id}></ModalComentario>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avaliacao;
