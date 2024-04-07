import axios from "axios";
const AXIOS__CONFIG = {
  headers: {
    "app-id": import.meta.env.VITE_DUMMY_APP_ID,
  },
};

export const GET_USERS = (page: number, limit: number) => {
  return axios
    .get(
      `${import.meta.env.VITE_DUMMY_BASE_URL}?page=${page}&limit=${limit}`,
      AXIOS__CONFIG
    )
    .then(({ data }) => data);
};

export const GET_USER = (user_id: string) => {
  return axios
    .get(`${import.meta.env.VITE_DUMMY_BASE_URL}/${user_id}`, AXIOS__CONFIG)
    .then(({ data }) => data);
};

export const POST_USER = (data: object) => {
  return axios
    .post(`${import.meta.env.VITE_DUMMY_BASE_URL}/create`, data, AXIOS__CONFIG)
    .then(({ data }) => data);
};

export const UPDATE_USER = (user_id: string, values: object) => {
  return axios
    .put(
      `${import.meta.env.VITE_DUMMY_BASE_URL}/${user_id}`,
      values,
      AXIOS__CONFIG
    )
    .then(({ data }) => data);
};

export const DELETE_USER = (user_id: string) => {
  return axios
    .delete(`${import.meta.env.VITE_DUMMY_BASE_URL}/${user_id}`, AXIOS__CONFIG)
    .then(({ data }) => data);
};
