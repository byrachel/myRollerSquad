import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axios.interceptors.request.use(
//   function (config) {
//     // faire quelque chose avant que la requête ne soit envoyée
//     return config;
//   },
//   function (error) {
//     // faire quelque chose en cas d’erreur
//     return Promise.reject(error);
//   }
// );

// ajout d’un intercepteur de réponse
axios.interceptors.response.use(
  function (response) {
    // n’importe quel code de réponse HTTP dans la plage 2xx activera cette
    // fonction
    // faire quelque chose avec les données de la réponse

    const accessToken = localStorage.getItem("token");

    if (
      accessToken &&
      error.response?.status === 401 &&
      originalRequest?._retry !== true
    ) {
      const originalRequest = error.config;
      originalRequest._retry = true;

      axios
        .post("/api/refreshtoken")
        .then(res => {
          console.log("refresh token", res);
          const token = res.headers.get("authorization");
          if (token) {
            localStorage.setItem("token", token);
          }
          return instance(originalRequest);
        })
        .catch(err => console.log(err));
    }
    return response;
  },
  function (error) {
    // n’importe quel code de réponse HTTP hors de la plage 2xx activera cette
    // fonction
    // faire quelque chose avec les données de l’erreur
    return Promise.reject(error);
  }
);
