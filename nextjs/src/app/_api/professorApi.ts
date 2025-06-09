import api from '../../utils/api';
import { ProfessorData } from '../../types/Professor';
import { UpdateProfessor } from '../../types/Professor';

export const postProfessor = async (dados: ProfessorData) => {
    const response = await api.post('/professor', dados)
    return response.data
}

export const getAllProfessores = async (): Promise<ProfessorData[]> => {
    const response = await api.get('/professor')
    return response.data
}

export const getProfessor = async (id: number): Promise<ProfessorData> => {
    const response = await api.get(`/professor/${id}`)
    return response.data
}

export const updateProfessor = async (id: number, dados: UpdateProfessor) => {
    const response = await api.patch(`/professor/${id}`, dados)
    return response.data
}

export const deleteProfessor = async (id: number) => {
    const response = await api.delete(`/professor/${id}`)
    return response.data
}
