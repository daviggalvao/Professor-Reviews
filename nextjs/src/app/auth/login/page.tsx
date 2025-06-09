"use client";

import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState } from "react";
import { loginUser } from "@/app/_api/authApi";
import logoUnb from "../../../assets/logounb.svg";

import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevents page reload

    try {
      const response = await loginUser(email, senha);
      console.log("User authenticated successfully:", response);

      // Saving the token in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Redirecting the user
      window.location.href = "/";
    } catch (error) {
      console.error("Authentication error:", error);
      setError("Invalid email or password. Please try again.");
    }
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
        <form onSubmit={handleLogin} className="text-black w-3/5">
          <label htmlFor="email"></label>
          <br />
          <input
            className="text-center relative w-full p-5 mb-3 rounded-3xl"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="senha"></label>
          <br />
          <input
            className="text-center relative w-full p-5 mb-3 rounded-3xl"
            type="password"
            id="senha"
            name="password"
            placeholder="Password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="text-center bg-foreground text-white p-4 w-1/3 rounded-2xl"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

