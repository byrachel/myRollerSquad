// import axios from "axios";

// const handleToken = async () => {
//   axios
//     .post("/api/refreshtoken")
//     .then(res => {
//       console.log("interceptor refresh token", res);
//       const token = res.headers.get("authorization");
//       window.localStorage.setItem("token", token);
//       return token;
//     })
//     .catch(err => console.log(err));
// };

// const instance = axios.create({
//   baseURL: "http://localhost:3000",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${window.localStorage.getItem("token")}`,
//   },
//   withCredentials: true,
// });

// // axios.interceptors.request.use(
// //   function (config) {
// //     // faire quelque chose avant que la requête ne soit envoyée
// //     return config;
// //   },
// //   function (error) {
// //     // faire quelque chose en cas d’erreur
// //     return Promise.reject(error);
// //   }
// // );

// // ajout d’un intercepteur de réponse
// axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function async(error) {
//     const accessToken = window.localStorage.getItem("token");
//     console.log("interceptor", accessToken);
//     const originalRequest = error.config;
//     console.log(originalRequest);

//     if (
//       accessToken &&
//       error.response?.status === 401 &&
//       originalRequest?._retry !== true
//     ) {
//       originalRequest._retry = true;

//       handleToken();

//       return instance(originalRequest);
//     }
//   },
//   function (error) {
//     // n’importe quel code de réponse HTTP hors de la plage 2xx activera cette
//     // fonction
//     // faire quelque chose avec les données de l’erreur
//     return Promise.reject(error);
//   }
// );
