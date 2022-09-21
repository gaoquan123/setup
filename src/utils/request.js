import axios from "axios";

// create an axios instance
const service = axios.create({
  timeout: 5 * 60 * 1000,
});

/**
 * request interceptor, used to:
 *  - preset token
 */
service.interceptors.request.use(
  (config) => {
    config.headers = {
      "Access-Control-Allow-Origin": "*",
    };

    if (config.data instanceof FormData) {
      config.headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
    }

    return config;
  },
  (error) => {
    console.error("send api failed: ", error);
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  ({ status, data }) => {
    if (status !== 200) {
      return null;
    }
    return data;
  },
  (error) => {
    console.error("api request failed: ", error);

    return Promise.reject(error);
  }
);

export default service;
