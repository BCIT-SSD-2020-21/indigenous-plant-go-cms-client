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
  try {
    const response = await axios.get(`${BASE_URL}/locations`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getImages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/images`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getAudios = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/audios`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getVideos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getTags = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tags`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getCategoryGroup = async (group) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/group/${group}`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getAllPlants = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/plants`);

    return response.data;
  } catch (error) {
    console.log(error.reponse);
    return {
      error: error.response,
    };
  }
};

export const createPlant = async (plant) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/plants`, plant, {
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

export const createCategory = async (category) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/categories`, category, {
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

export const deleteCategory = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.delete(`${BASE_URL}/categories/${id}`, {
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

export const updateCategory = async (id, category) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.put(`${BASE_URL}/categories/${id}`, category, {
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
