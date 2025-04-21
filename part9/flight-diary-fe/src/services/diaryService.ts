import axios from 'axios';
import { NewDiaryEntry, DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getDiary = async (_version: number): Promise<DiaryEntry[]> => {
    const response = await axios
        .get<DiaryEntry[]>(baseUrl);

    return response.data;
}

export const createEntry = async (object: NewDiaryEntry): Promise<DiaryEntry> => {
    const response = await axios
        .post<DiaryEntry>(baseUrl, object);

    return response.data;
}
