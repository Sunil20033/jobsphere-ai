import axios from "axios";

const API_URL = "https://jobsphere-ai-qfsv.onrender.com/api/jobs";

export const getJobs = () => axios.get(API_URL);

export const getJobById = (id) => axios.get(`${API_URL}/${id}`);

export const addJob = (job) => axios.post(API_URL, job);

export const updateJob = (id, job) => axios.put(`${API_URL}/${id}`, job);

export const deleteJob = (id) => axios.delete(`${API_URL}/${id}`);