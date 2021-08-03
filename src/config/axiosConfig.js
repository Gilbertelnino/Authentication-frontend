/* eslint-disable no-param-reassign */
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import jwt_decode from "jwt-decode";

const apiUrl = "http://localhost:5500";
export default function axiosConfig(axios) {
  if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = apiUrl;
  } else {
    axios.defaults.baseURL = apiUrl;
  }
  axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("token");

      if (accessToken) {
        const decode = jwt_decode(accessToken);
        if (Date.now() <= decode.payload.exp * 1000) {
          config.headers["auth-token"] = localStorage.getItem("token");
          config.headers.accept = "application/json";
          return Promise.resolve();
        }
        const request = new Request(
          `${apiUrl}/users/renewToken/${decode.payload.id}`,
          {
            method: "GET",
            headers: new Headers({ "Content-Type": "application/json" }),
          }
        );
        return fetch(request)
          .then((response) => {
            if (response.status < 200) {
              throw new Error(response.statusText);
            }
            const data = response.json();
            return data;
          })
          .then((auth) => {
            localStorage.setItem("token", auth.accessToken);
            config.headers["auth-token"] = localStorage.getItem("token");
            config.headers.accept = "application/json";
            return Promise.resolve();
          })
          .catch((err) => {
            throw new Error(err);
          });
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      if (
        error.response.data.error === "Not Allowed" ||
        error.response.data.error === "Token is incorrect or expired!"
      ) {
        // Logout the user
        localStorage.removeItem("token");
        window.location = "/";
      }
      if (error.response && error.response.status === 500) {
        toast.error("Something went wrong. Try reloading...");
      }

      return Promise.reject(error);
    }
  );
}
