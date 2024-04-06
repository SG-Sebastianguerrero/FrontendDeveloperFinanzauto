import axios from "axios";

export const GET_USERS = (page: number, limit: number) => {
  return axios
    .get(`${import.meta.env.VITE_DUMMY_BASE_URL}?page=${page}&limit=${limit}`, {
      headers: {
        "app-id": import.meta.env.VITE_DUMMY_APP_ID,
      },
    })
    .then(({ data }) => data);
};
export const GET_USER = (user_id: string) => {
  return axios
    .get(`${import.meta.env.VITE_DUMMY_BASE_URL}/${user_id}`, {
      headers: {
        "app-id": import.meta.env.VITE_DUMMY_APP_ID,
      },
    })
    .then(({ data }) => data);
};
