import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`api/users/login`, {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
};

export const register = async ({ email, username, password }) => {};
