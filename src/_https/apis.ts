import axios from "axios";
import { HTTPS_API } from "./index";

//
/// baseUrl
export const API = axios.create({
  baseURL: HTTPS_API,
  headers: { "Content-Type": "application/json" },
});
