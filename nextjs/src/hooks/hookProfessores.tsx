import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAllProfessores, getProfessor } from '../app/_api/professorApi';
import { ProfessorData } from '../types/Professor';

export function hookAllProfessores() {
  const [professores, setProfessores] = useState<ProfessorData[]>([]);

  useEffect(() => {
    const fetchProfessores = async () => {
      const data = await getAllProfessores();
      setProfessores(data);
    };
    fetchProfessores();
  }, []);

  return professores;
}

export function hookProfessor() {
  const [professor, setUser] = useState<ProfessorData | null>(null)
  
    const { id } = useParams()
    const router = useRouter()
  
    useEffect(() => {
  
      if (!id || isNaN(Number(id))) {
        return router.push('/'); 
      }
  
      const fetchUser = async () => {
        try{
          const user = await getProfessor(Number(id));
          setUser(user);
        } 
        catch (error) {
          console.error("Erro ao buscar usuário:", error);
          router.push('/');
        }
      };
      fetchUser();
    }, [id, router]);
  
    return professor;
}
