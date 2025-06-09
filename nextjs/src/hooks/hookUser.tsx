import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUser, getAllUsers } from '../app/_api/userApi';
import { UserData } from '../types/User';

export function hookUser() {
  const [user, setUser] = useState<UserData | null>(null)

  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {

    if (!id || isNaN(Number(id))) {
      return router.push('/'); 
    }

    const fetchUser = async () => {
      try{
        const user = await getUser(Number(id));
        setUser(user);
      } 
      catch (error) {
        console.error("Erro ao buscar usuário:", error);
        router.push('/');
      }
    };
    fetchUser();
  }, [id, router]);

  return user;
}

export function hookUserID(id: number | null) {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      router.push('/');
      return;
    }

    const fetchUser = async () => {
      try {
        const user = await getUser(Number(id));
        setUser(user);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        router.push('/');
      }
    };

    fetchUser();
  }, [id, router]);

  return user;
}

export function hookAllUsers() {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const users = await getAllUsers();
      setUsers(users);
    };
    fetchUser();
  }, []);
  return users;
}