import api from "../../utils/api";
import { UserData } from "../../types/User";
import { UpdateUser } from "../../types/User";
import { getToken } from "@/utils/auth";

export const postUser = async (dados: UserData) => {
  const response = await api.post("/user", dados);
  return response.data;
};

export const getAllUsers = async (): Promise<UserData[]> => {
  const response = await api.get("/user");
  return response.data;
};

export const getUser = async (id: number): Promise<UserData> => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};

export const getUserByEmail = async (email: string): Promise<UserData> => {
  const response = await api.get(`/user/email/${email}`);
  return response.data;
};

export const updateUser = async (id: number, dados: UpdateUser) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await api.patch(`user/${id}`, dados, {
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

export const deleteUser = async (userId: number) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await api.delete(`user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });
    console.log("User deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting user:", error);
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please check your credentials.");
    }
  }
};
