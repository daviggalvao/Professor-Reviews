'use client';

import { useState } from 'react';
import '../../styles/globals.css';
import stylesmc from '../styles/modal.module.css';

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
      <div className={stylesmc.d}>
        <button onClick={() => setOpen(!open)} className={stylesmc.buttonc}>&#x2713; Avaliar</button>
        {open ? (
            <div className={`h-full w-full bg-black/40 fixed top-0 left-0 transition-all ${open? "opacity-100" : "opacity-0"}`}>
              <br />
                <div className={stylesmc.caixam}>
                  <div>
                    <form>
                      <select name="professor" id="professor" className={stylesmc.input}>
                        <option value="" disabled selected>Nome do Professor</option>
                      </select>
                      <select name="disciplina" id="disciplina" className={stylesmc.input}>
                        <option value="Disciplina" className="" disabled selected>Disciplina</option>
                      </select>
                    </form>
                  </div>
                  <div className="bg-foreground flex flex-col items-center justify-center rounded-md h-4/5 w-11/12">
                    <div className="w-full h-[2px] bg-background mt-10"></div>
                    <div className="flex-1 outline-none w-full text-start flex text-wrap rounded-3xl">
                      <textarea className="outline-none bg-foreground resize-none w-full" id="comment"/>
                    </div>
                    <br />
                  </div>
                  <div className={stylesmc.space}>
                    <button className = {stylesmc.buttonc}>Avaliar</button>
                    <div className={stylesmc.spacei1}>
                      <button onClick={() => setOpen(!open)} className = {stylesmc.buttonc}>Sair</button>
                    </div>
                  </div>
                </div>
            </div>
        ) : (<div className={stylesmc.hide}></div>)}
      </div>
  );
}
