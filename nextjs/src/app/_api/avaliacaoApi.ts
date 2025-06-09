import api from "../../utils/api";
import { AvaliacaoData } from "../../types/Avaliacao";
import { UpdateAvaliacao } from "../../types/Avaliacao";

export const postAvaliacao = async (dados: AvaliacaoData) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await api.post("avaliacao", dados, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });
    console.log("Avaliação criada com sucesso:", response.data);
  } catch (error) {
    console.error("Não foi possível criar a avaliação:", error);
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please check your credentials.");
    }
  }
};

export const getAllAvaliacoes = async (): Promise<AvaliacaoData[]> => {
  const response = await api.get("/avaliacao");
  return response.data;
};

export const getAvaliacao = async (id: number): Promise<AvaliacaoData> => {
  const response = await api.get(`/avaliacao/${id}`);
  return response.data;
};

export const updateAvaliacao = async (id: number, dados: UpdateAvaliacao) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await api.patch(`avaliacao/${id}`, dados, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please check your credentials.");
    }
  }
};

export const deleteAvaliacao = async (id: number) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await api.delete(`/avaliacao/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please check your credentials.");
    }
  }
};
