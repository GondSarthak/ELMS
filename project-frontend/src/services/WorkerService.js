import axios from "axios";

const Rest_Api_base_URL = 'http://localhost:6900/api/workers';

export const listWorkers = () => axios.get(Rest_Api_base_URL);
