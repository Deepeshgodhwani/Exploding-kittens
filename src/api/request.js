import { handleError } from "./handleError";
import axios from "axios";

import { GET, POST, PUT } from "./httpConstants";
let hostUrl = process.env.REACT_APP_USER_API;

export const request = (method, endPoint, reqBody = null) => {
  const requestPromise = (httpMethod) => {
    return axios.request({
      url: hostUrl + endPoint,
      method: httpMethod,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      data: reqBody,
    });
  };

  switch (method) {
    case POST:
      return requestPromise(POST)
        .then((response) => response.data)
        .catch((error) => handleError(error));
    case PUT:
      return requestPromise(PUT)
        .then((response) => response.data)
        .catch((error) => handleError(error));
    case GET:
      return requestPromise(GET)
        .then((response) => response.data)
        .catch((error) => handleError(error));
    default:
      return "Wrong Call";
  }
};
