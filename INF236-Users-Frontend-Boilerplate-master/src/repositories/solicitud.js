import axios from "axios";

export const addsolicitud = async (data) =>
	axios
		.post(`${process.env.REACT_APP_BACKEND_URL}/solicitud`, data);


export const getSoli = (id) =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/solicitud/${id}`)
		.then((res) => res.data);

export const getAllSolis = () =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/solicitud`)
		.then((res) => res.data);

export const getSoliByEjecutivo = (userId) => 
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/solicitud/getByEjecutivo/${userId}`)
		.then((res) =>  res.data);

export const deleteSoli = async (id) =>
	axios.delete(`${process.env.REACT_APP_BACKEND_URL}/solicitud/${id}`).then(res => res.data);

export const deriSoli = async (id) =>
	axios.post(`${process.env.REACT_APP_BACKEND_URL}/derivados/${id}`);
	
export const updateDeriSoli = async (id) =>
	axios.put(`${process.env.REACT_APP_BACKEND_URL}/solicitud/${id}`);

export const genInformePeriodo = async (d_i,d_f) =>
	axios
		.post(`${process.env.REACT_APP_BACKEND_URL}/solicitud/dates`, {
			initial_date: d_i,
			end_date: d_f
		})
		.then((res) => res.data);


