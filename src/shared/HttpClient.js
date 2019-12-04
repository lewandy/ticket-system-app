import axios from 'axios';

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASE_URI,
  headers: {
    Authorization: 'Bearer '+ localStorage.getItem("_tkn")
  }
})