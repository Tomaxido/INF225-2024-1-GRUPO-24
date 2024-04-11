import axios from "axios";

const getAllSolis = () =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/derivados`)
		.then((res) => res.data);
const aprobarDeriSoli = async (id) =>
		axios.put(`${process.env.REACT_APP_BACKEND_URL}/solicitud/aprob/${id}`);
const rechazarDeriSoli = async (id) =>
		axios.put(`${process.env.REACT_APP_BACKEND_URL}/solicitud/rech/${id}`);
export { getAllSolis,aprobarDeriSoli,rechazarDeriSoli};