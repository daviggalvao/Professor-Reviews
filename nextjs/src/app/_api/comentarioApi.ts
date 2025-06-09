import api from "../../utils/api";
import { ComentarioData } from "../../types/Comentario";
import { UpdateComentario } from "../../types/Comentario";

export const postComentario = async (dados: ComentarioData) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await api.post("/comentario", dados, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating Comentario:", error);
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please check your credentials.");
    }
  }
};

export const getAllComentarios = async (): Promise<ComentarioData[]> => {
  const response = await api.get("/comentario");
  return response.data;
};

export const getComentario = async (id: number): Promise<ComentarioData> => {
  const response = await api.get(`/comentario/${id}`);
  return response.data;
};

export const updateComentario = async (id: number, dados: UpdateComentario) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await api.patch(`comentario/${id}`, dados, {
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

export const deleteComentario = async (id: number) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await api.delete(`/comentario/${id}`, {
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
