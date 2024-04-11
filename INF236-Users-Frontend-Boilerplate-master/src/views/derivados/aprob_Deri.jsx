import React from "react";
import PropTypes from "prop-types"; // ES6
import { mutate } from 'swr';
import { aprobarDeriSoli } from "../../repositories/derivados";
import { useHistory } from 'react-router-dom';



export default function DeriForm({ id, callback }) {
	const history = useHistory();
	const aprobar = async (e) => {
		
		e.preventDefault();
		try {
			await callback(id);
            await aprobarDeriSoli(id);
			mutate("/solicitud/all");
			alert("Solicitud Aprobada correctamente");
			history.push('/derivados');
		} catch (error) {
			alert("A ocurrido un error al Aprobar la solicitud");
		}
	};
	return (
		<form onSubmit={aprobar} className="d-inline-block ml-4" action="">
			<input type="hidden" name="id" value={id} />
			<button onClick={aprobar} className="btn btn-success" type="button">
				Aprobar
			</button>
		</form>
	);
}
DeriForm.propTypes = {
	id: PropTypes.number.isRequired,
	callback: PropTypes.func.isRequired,
};
