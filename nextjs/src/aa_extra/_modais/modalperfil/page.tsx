'use client';

import { useState } from 'react';
import Image from "next/image";
import '../../styles/globals.css';
import stylesmc from '../styles/modal.module.css';

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
      <div className={stylesmc.d}>
        <button onClick={() => setOpen(!open)} className={stylesmc.buttonc}>&#x270E; Editar</button>
        {open ? (
          <div className={`h-full w-full bg-black/40 fixed top-0 left-0 transition-all ${open? "opacity-100" : "opacity-0"}`}>

              <div className = {stylesmc.mid}>
                
                <div onClick={() => setOpen(false)} className="text-[#aaa] absolute right-3 cursor-pointer top-3 text-3xl font-bold">&times;</div>

                <Image src="https://th.bing.com/th/id/OIP.hcRhDT8KVqzySjYJmBhlzgHaHa?rs=1&pid=ImgDetMain" 
                alt = "Foto de perfil não cadastrada" className = {stylesmc.fp} width={100} height ={100}/> 

                <form>
                  <label htmlFor="nome"></label><br/>
                  <input className = {stylesmc.buttonm} type="name" id="nome" name="nome" placeholder = "Nome"/>

                  <label htmlFor="email"></label><br/>
                  <input className = {stylesmc.buttonm} type="email" id="email" name="email" placeholder = "Email"/>

                  <label htmlFor="curso"></label><br/>
                  <input className = {stylesmc.buttonm} type="name" id="curso" name="curso" placeholder = "Curso"/>

                  <label htmlFor="departamento"></label><br/>
                  <input className = {stylesmc.buttonm} type="name" id="departamento" name="departamento" placeholder = "Departamento"/>

                  <label htmlFor="senha"></label><br/>
                  <input className = {stylesmc.buttonm} type="password" id="senha" name="senha" placeholder = "Senha atual"/>

                  <label htmlFor="senha"></label><br/>
                  <input className = {stylesmc.buttonm} type="password" id="senha" name="senha" placeholder = "Nova senha"/>

                  <label htmlFor="senha"></label><br/>
                  <input className = {stylesmc.buttonm} type="password" id="senha" name="senha" placeholder = "Confirmar nova senha"/>
                </form> 

                <div>
                  <button className = {stylesmc.buttonc}>Salvar</button>
                </div>

          </div>
        </div>
    ) : (
      <div className={stylesmc.hide}></div>
    )}
      </div>
  );
}
