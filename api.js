import axios from 'axios';
// import { API_URL } from '@env';

const API_URL = "https://crudcrud.com/api/be44f246669748428a83047bf73d6dc4"

export const getItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createItem = async (item) => {
  try {
    const response = await axios.post(`${API_URL}/items`, item);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateItem = async (id, item) => {
  try {
    const response = await axios.put(`${API_URL}/items/${id}`, item);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/items/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
