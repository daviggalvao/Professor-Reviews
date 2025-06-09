import React, { useEffect, useState } from "react";
import { UserData } from "../../types/User";
import { getToken } from "../../utils/auth";
import "../../app/globals.css";
import Image from "next/image";
import commentUser from "../../assets/comment.svg";
import pencil from "../../assets/pencil.svg";

import { getStorageUser } from "../../utils/auth";
import { updateComentario, deleteComentario } from "@/app/_api/comentarioApi";

const ModalEditComentario = ({ ComentarioID }: { ComentarioID: number }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    conteudo: "",
  });

  const delCom = async () => {
    try {
      await deleteComentario(ComentarioID);
      window.location.reload();
    } catch (error) {}
  };

  const editComentario = async () => {
    try {
      const response = await updateComentario(ComentarioID, input);
      window.location.reload();
      if (response && response.data) {
        console.log("Avaliação updated successfully:", response.data);
      } else {
        console.error("No data returned from updateAvaliacao", response.data);
      }
      setOpen(false);
    } catch (error: any) {
      if (error.response) {
        console.error("Error updating avaliação:", error.response.data);
      } else {
        console.error("Error updating avaliação:", error.message);
      }
    }
  };

  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        <Image
          src={pencil}
          alt="icone comentário"
          className=""
          width={25}
          height={25}
        />
      </button>
      {open ? (
        <div className="h-full w-full bg-black/40 fixed top-0 left-0">
          <br />
          <div className="flex flex-col items-center h-5/6 w-10/12 gap-2 bg-foreground p-8 rounded-xl relative m-auto">
            <br />
            <div className="bg-foreground flex flex-col items-center justify-center rounded-md h-4/5 w-11/12">
              <div className="flex-1 outline-none w-full text-start flex text-wrap rounded-3xl">
                <textarea
                  className="bg-white outline-none bg-foreground resize-none w-full"
                  id="comment"
                  onChange={(e) =>
                    setInput({ ...input, conteudo: e.target.value })
                  }
                />
              </div>
              <br />
            </div>
            <div className="flex">
              <button
                onClick={editComentario}
                className="text-white bg-[#00FFFF] mr-2 px-1 rounded-xl w-28 flex justify-center items-center cursor-pointer text-lg border-2 border-white"
              >
                Edit
              </button>
              <button
                onClick={delCom}
                className="text-white ml-56  bg-red-400  mr-2 px-1 py-1 rounded-xl w-28 flex justify-center items-center cursor-pointer text-lg border-2 border-white"
              >
                Delete
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="text-white ml-56  bg-[#00FFFF]  mr-2 px-1 py-1 rounded-xl w-28 flex justify-center items-center cursor-pointer text-lg border-2 border-white"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden"></div>
      )}
    </div>
  );
};

export default ModalEditComentario;
