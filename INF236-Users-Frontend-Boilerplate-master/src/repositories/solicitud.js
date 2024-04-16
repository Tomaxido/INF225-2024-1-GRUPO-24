import axios from "axios";

const addsolicitud = async (data) =>
	axios
		.post(`${process.env.REACT_APP_BACKEND_URL}/solicitud`, data);


const getSoli = (id) =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/solicitud/${id}`)
		.then((res) => res.data);

const getAllSolis = () =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/solicitud`)
		.then((res) => res.data);

const getSoliByEjecutivo = (userId) => 
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/solicitud/getByEjecutivo/${userId}`)
		.then((res) =>  res.data);

const deleteSoli = async (id) =>
	axios.delete(`${process.env.REACT_APP_BACKEND_URL}/solicitud/${id}`).then(res => res.data);

const deriSoli = async (id) =>
	axios.post(`${process.env.REACT_APP_BACKEND_URL}/derivados/${id}`);
	
const updateDeriSoli = async (id) =>
	axios.put(`${process.env.REACT_APP_BACKEND_URL}/solicitud/${id}`);
export { addsolicitud, getAllSolis,getSoli,deleteSoli,deriSoli,updateDeriSoli, getSoliByEjecutivo};