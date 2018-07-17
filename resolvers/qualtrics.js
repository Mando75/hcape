/**
 * @author Bryan Muller
 */
import axios from 'axios';

/**
 * Defines a unique axios instance used to interact
 * with the Qualtrics API.
 *
 * QUALTRICS_DOMAIN is the baseURL used by the BYU-I
 * Qualtrics data centers.
 *
 * QUALTRICS_AUTH_TOKEN must be a valid Qualtrics API
 * token with permissions to interact with the BYU-I Qualtrics instance
 * @type {AxiosInstance}
 */
export const axiosQualtrics = axios.create({
  baseURL: process.env.QUALTRICS_DOMAIN,
  headers: {'X-API-TOKEN': process.env.QUALTRICS_AUTH_TOKEN}
});