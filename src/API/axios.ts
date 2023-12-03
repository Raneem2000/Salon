import { newAbortSignal } from "../helper/DateHelpers";
import { showError } from "../libs/reactToastify";
import { API_BASE_URL } from "./domain";
import axios from "axios";

const DeliveryApiInstances = axios.create({
  baseURL: API_BASE_URL,
});
DeliveryApiInstances.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.setAuthorization(`Bearer ${token}`);
  return config;
});
let timerToAbort = 5000;
DeliveryApiInstances.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.reload();
    } else throw error.response.data.errorMessage;
  }
);
DeliveryApiInstances.interceptors.response.use(
  (response) => {
    timerToAbort = 5000
    return response},
  async (error) => {
    if (error.response.status === 401) {
      const signal = newAbortSignal(timerToAbort);
      timerToAbort -= timerToAbort;
      localStorage.clear();
      window.location.reload();
      console.log(signal)
    
    } else {
      showError(error.response.data.errorMessage);
      const _error = new Error(error.response.data.errorMessage);
      throw _error;
    }
  }
);
export default DeliveryApiInstances;
