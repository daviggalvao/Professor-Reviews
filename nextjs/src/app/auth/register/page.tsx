"use client";

import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logoUnb from "../../../assets/logounb.svg";
import "../../globals.css";
import styles from "../../../aa_extra/styles/login.module.css";

import { registerUser } from "@/app/_api/authApi";

export default function SignIn() {
  const [input, setInput] = useState({
    email: "",
    nome: "",
    senha: "",
    curso: "",
    departamento: "",
    foto_perfil: "",
  });

  const createUser = async () => {
    try {
      await registerUser(input);
      window.location.href = "/auth/login";
    } catch (error) {}
  };

  return (
    <div className="flex h-screen">
      <div className="bg-foreground flex flex-col justify-center items-center">
        <Image
          src={logoUnb}
          alt="Logo UnB"
          className="flex basis-1/4 h-1/2 w-1/2"
          width={500}
          height={500}
        />
      </div>

      <div className="flex basis-2/4 flex-col justify-center items-center bg-background">
        <h1 className="text-center text-white text-5xl">
          Professor Reviews
        </h1>
        <form className="text-black w-3/5 my-4">
          <input
            type="email"
            className="text-center relative w-full mb-3 p-5 rounded-3xl"
            placeholder="Email"
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <input
            type="text"
            className="text-center relative w-full mb-3 p-5 rounded-3xl"
            placeholder="Name"
            onChange={(e) => setInput({ ...input, nome: e.target.value })}
          />
          <input
            type="password"
            className="text-center relative w-full mb-3 p-5 rounded-3xl"
            placeholder="Password"
            onChange={(e) => setInput({ ...input, senha: e.target.value })}
          />
          <input
            type="text"
            className="text-center relative w-full mb-3 p-5 rounded-3xl"
            placeholder="Course"
            onChange={(e) => setInput({ ...input, curso: e.target.value })}
          />
          <input
            type="text"
            className="text-center relative w-full p-5 rounded-3xl"
            placeholder="Department"
            onChange={(e) =>
              setInput({ ...input, departamento: e.target.value })
            }
          />
        </form>
        <div className="flex justify-center items-center w-1/4">
          <button
            onClick={createUser}
            className="text-center bg-foreground text-white p-4 w-3/4 rounded-2xl"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
