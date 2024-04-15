import config from "./config";

export const getAll = async () => {
    const response = await fetch(`${config.baseURL}/blogs`);
    return response.json();
};

export const getById = async (id: string) => {
    const response = await fetch(`${config.baseURL}/blogs/${id}`);
    return response.json();
};