import axios, { AxiosResponse } from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, 
});

export default async function fetchHttp(
    path: string, 
    payload: {
        method: string;
        body?: any;
    }
): Promise<AxiosResponse<any>> {
    try {
        switch (payload.method.toUpperCase()) {
            case 'GET':
                return await api.get(path);
            case 'POST':
                return await api.post(path, payload.body);
            case 'PUT':
                return await api.put(path, payload.body);
            case 'DELETE':
                return await api.delete(path);
            default:
                throw new Error(`Unsupported method: ${payload.method}`);
        }
    } catch (error) {
        console.error('Error making HTTP request:', error);
        throw error;
    }
}
