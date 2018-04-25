import axios from 'axios';
export const axiosQualtrics = axios.create({
  baseURL: process.env.QUALTRICS_DOMAIN,
  headers: {'X-API-TOKEN': process.env.QUALTRICS_AUTH_TOKEN}
});