import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAvaliacao  } from '../app/_api/avaliacaoApi';
import { AvaliacaoData } from '../types/Avaliacao';

export function hookAvaliacao() {
  const [avaliacao, setUser] = useState<AvaliacaoData | null>(null)

  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {

    if (!id || isNaN(Number(id))) {
      return router.push('/'); 
    }

    const fetchUser = async () => {
      try{
        const avaliacao = await getAvaliacao(Number(id));
        setUser(avaliacao);
      } 
      catch (error) {
        console.error("Erro ao buscar avaliação:", error);
        router.push('/');
      }
    };
    fetchUser();
  }, [id, router]);

  return avaliacao;
}

export function hookAvaliacaoID(id: number | null) {
  const [avaliacao, setUser] = useState<AvaliacaoData | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      router.push('/');
      return;
    }

    const fetchUser = async () => {
      try {
        const aval = await getAvaliacao(Number(id));
        setUser(aval);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        router.push('/');
      }
    };

    fetchUser();
  }, [id, router]);

  return avaliacao;
}