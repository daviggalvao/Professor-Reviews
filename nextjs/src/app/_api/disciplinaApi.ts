import api from '../../utils/api';
import { DisciplinaData } from '../../types/Disciplina';
import { UpdateDisciplina } from '../../types/Disciplina';

export const postDisciplina = async (dados: DisciplinaData) => {
    const response = await api.post('/disciplina', dados)
    return response.data
}

export const getAllDisciplinas = async (): Promise<DisciplinaData[]> => {
    const response = await api.get('/disciplina')
    return response.data
}

export const getDisciplina = async (id: number): Promise<DisciplinaData> => {
    const response = await api.get(`/disciplina/${id}`)
    return response.data
}

export const updateDisciplina = async (id: number, dados: UpdateDisciplina) => {
    const response = await api.patch(`/disciplina/${id}`, dados)
    return response.data
}

export const deleteDisciplina = async (id: number) => {
    const response = await api.delete(`/disciplina/${id}`)
    return response.data
}
