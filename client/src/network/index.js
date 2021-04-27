import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getToken = () => {
  const userData = JSON.parse(
    localStorage.getItem("INDIGENOUSPLANTGOCMS-userData")
  );

  if (userData && userData.accessToken) return userData.accessToken;
  // Else return nothing
  return null;
};

export const ping = async () => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.get(`${BASE_URL}/ping`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getLocations = async () => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.get(`${BASE_URL}/locations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.message,
    };
  }
};
