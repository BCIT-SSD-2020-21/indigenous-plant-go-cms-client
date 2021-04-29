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
      user_name: username,
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

export const deleteLocation = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.delete(`${BASE_URL}/locations/${id}`, {
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

export const updateLocation = async (id, location) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.put(`${BASE_URL}/locations/${id}`, location, {
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

export const deleteImage = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.delete(`${BASE_URL}/images/${id}`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const updateImage = async (image, id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.put(`${BASE_URL}/images/${id}`, image, {
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

export const createAudio = async (formData) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/audios`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

export const deleteAudio = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.delete(`${BASE_URL}/audios/${id}`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const updateAudio = async (audio, id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.put(`${BASE_URL}/audios/${id}`, audio, {
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

export const createVideo = async (formData) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/videos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

export const deleteVideo = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.delete(`${BASE_URL}/videos/${id}`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const updateVideo = async (video, id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.put(`${BASE_URL}/videos/${id}`, video, {
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

export const getPlant = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/plants/${id}`);

    return response.data;
  } catch (error) {
    console.log(error.reponse);
    return {
      error: error.response,
    };
  }
};

export const updatePlant = async (id, plant) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.put(`${BASE_URL}/plants/${id}`, plant, {
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

export const createTag = async (tag) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/tags`, tag, {
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

export const deleteTag = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.delete(`${BASE_URL}/tags/${id}`, {
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

export const updateTag = async (id, tag) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };
  try {
    const response = await axios.put(`${BASE_URL}/tags/${id}`, tag, {
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

export const createLocation = async (location) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/locations`, location, {
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

export const createImage = async (formData) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.post(`${BASE_URL}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

export const deletePlant = async (id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.delete(`${BASE_URL}/plants/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
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

export const bulkDeletePlants = async (array) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const deleteRequests = array.map((plantId) =>
      axios.delete(`${BASE_URL}/plants/${plantId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
    );

    const responses = await Promise.all(deleteRequests);
    return responses;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const updateUser = async (userData, id) => {
  const token = getToken();

  if (!token)
    return {
      error: "No token found. Could not authenticate request.",
    };

  try {
    const response = await axios.put(`${BASE_URL}/users/${id}`, userData, {
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

export const getUser = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return {
      error: error.response,
    };
  }
};
