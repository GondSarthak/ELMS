import axios from "axios";

export const GetWorkerById = (id) => {
    const Rest_Api_base_URL = `http://localhost:6900/api/workers/${id}`;
    return axios.get(Rest_Api_base_URL);
};
