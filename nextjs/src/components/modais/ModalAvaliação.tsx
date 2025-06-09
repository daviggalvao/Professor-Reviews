import React, { useEffect, useState } from "react";
import { UserData } from "../../types/User";
import { getStorageUser } from "../../utils/auth";
import { postAvaliacao } from "@/app/_api/avaliacaoApi";
import { hookAllProfessores } from "@/hooks/hookProfessores";
import { ProfessorData } from "@/types/Professor";
import "../../app/globals.css";
import Link from "next/link";
import { AvaliacaoData } from "@/types/Avaliacao";
import Avaliacao from "../entidades/Avaliacao";


const ModalAvaliação = () => {
  const professores = hookAllProfessores();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    professor: null,
    conteudo: "",
  });

  const handleProfessorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProfessor = JSON.parse(event.target.value);
    setInput((prev) => ({ ...prev, professor: selectedProfessor }));
  };

  const handleConteudoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput((prev) => ({ ...prev, conteudo: event.target.value }));
  };

  const createAvaliacao = async () => {
    console.log('aaaaaaaaa')
    if (!input.professor || !input.conteudo) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const AvaliacaoData: any = {
      professorID: input.professor.id,
      disciplinaID: input.professor.disciplinaID,
      conteudo: input.conteudo,
      usuarioID: getStorageUser().id,
    }

    try {
        await postAvaliacao(AvaliacaoData);
        window.location.href = "/";
      } catch (error) {}
    };

  return (
    <div>
      <button onClick={() => setOpen(!open)} className = "bg-foreground p-2 mr-3 text-white font-bold flex justify-center items-center rounded-xl">New Publication</button>
      
      {open? (
        <div className="h-full w-full bg-black/40 fixed top-0 left-0">
          <br />
          <br />
            <div className="flex flex-col items-center h-5/6 w-10/12 gap-2 bg-foreground p-8 rounded-xl relative m-auto">
                <form className="flex flex-col w-full justify-center items-center">

                  <select name="professor" id="professor" className="p-2 w-3/4 mb-2 rounded-lg" onChange={handleProfessorChange} value={input.professor ? JSON.stringify(input.professor) : ""}>
                    <option value="" disabled>
                      Professor&apos;s Name
                    </option>

                    {professores?.map((professor) => (
                      <option key={professor.id} value={JSON.stringify(professor)}>
                        {professor.nome}
                      </option>
                    ))}
                  </select>

                </form>
              <div className="bg-foreground flex flex-col items-center justify-center rounded-md h-4/5 w-11/12">
                <div className="flex-1 border-black outline-none h-full w-full text-start flex text-wrap rounded-3xl">
                  <textarea className="outline-none bg-white resize-none w-full rounded-xl" id="avaliacao" 
                  placeholder="Write your review here..." value={input.conteudo} onChange={handleConteudoChange} />
                </div>
                <br />
              </div>
              <div className="flex">
                <button onClick={createAvaliacao} className="text-white bg-[#00FFFF] mr-2 px-1 py-1 rounded-xl w-28 flex justify-center items-center cursor-pointer text-lg border-2 border-white"> Rate </button>
                <div className="ml-56">
                  <button onClick={() => setOpen(!open)} className="text-white bg-[#00FFFF] mr-2 px-1 py-1 rounded-xl w-28 flex justify-center items-center cursor-pointer text-lg border-2 border-white">Exit</button>
                </div>
              </div>
            </div>
          </div>
      ) : (
        <div className="hidden"></div>
      )}
    </div>
  );
};

export default ModalAvaliação;
