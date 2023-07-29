import axios from "axios";

const http = axios.create({
  baseURL: `/api/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const res = error.response;
    if (res.status == 401) window.location.href = "/login";
    return Promise.reject(error);
  }
);

export default http;
