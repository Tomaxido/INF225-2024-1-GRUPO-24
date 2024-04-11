import axios from "axios";

const addsimu= async (data) =>
	axios
		.post(`${process.env.REACT_APP_BACKEND_URL}/simulacion`, data);
const getsimu = (id) =>
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/simulacion/${id}`)
            .then((res) => res.data);
const getAllsimu = () =>
            axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/simulacion`)
                .then((res) => res.data);
export { addsimu,getsimu,getAllsimu}