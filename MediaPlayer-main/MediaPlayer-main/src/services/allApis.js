import axios from "axios";

// Base URL for the backend API
const base_url = "http://localhost:3000/api";

// Videos API
export const addVideos = async (data) => {
    return await axios.post(`${base_url}/videos`, data);
};

export const getVideos = async () => {
    return await axios.get(`${base_url}/videos`);
};

export const deleteVideo = async (id) => {
    return await axios.delete(`${base_url}/videos/${id}`);
};

// Categories API
export const addCategory = async (data) => {
    return await axios.post(`${base_url}/categories`, data);
};

export const getCategories = async () => {
    return await axios.get(`${base_url}/categories`);
};

export const deleteCategory = async (id) => {
    return await axios.delete(`${base_url}/categories/${id}`);  // Added the category ID here
};

export const updateCategory = async (id, data) => {
    return await axios.put(`${base_url}/categories/${id}`, data);
};


// History API
export const addHistory = async (data) => {
    return await axios.post(`${base_url}/history`, data);
};

export const getHistory = async () => {
    return await axios.get(`${base_url}/history`);
};

export const deleteHistory = async (id) => {
    return await axios.delete(`${base_url}/history/${id}`);
};

// User API
export const checkEmailApi = (email) => {
    return axios.get(`http://localhost:3000/api/users/check-email?email=${email}`);
  };
  

export const registerApi = async (data) => {
    return await axios.post(`${base_url}/users`, data);
};


export const loginApi = (email, password) => {
    return axios.get(`http://localhost:3000/api/users?email=${email}&password=${password}`);
  };
  

