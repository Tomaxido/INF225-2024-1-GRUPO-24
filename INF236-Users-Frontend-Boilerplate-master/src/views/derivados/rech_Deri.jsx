import React from "react";
import PropTypes from "prop-types"; // ES6
import { mutate } from 'swr';
import { rechazarDeriSoli } from "../../repositories/derivados";
import { useHistory } from 'react-router-dom';



export default function DeriForm({ id, callback }) {
	const history = useHistory();	
	const rechazar = async (e) => {
		
		e.preventDefault();
		try {
			await callback(id);
            await rechazarDeriSoli(id);
			mutate("/solicitud/all");
			alert("Solicitud Rechazada correctamente");
			history.push('/derivados');
		} catch (error) {
			alert("A ocurrido un error al Recahzar la solicitud");
		}
	};
	return (
		<form onSubmit={rechazar} className="d-inline-block ml-4" action="">
			<input type="hidden" name="id" value={id} />
			<button onClick={rechazar} className="btn btn-danger" type="button">
				Rechazar
			</button>
		</form>
	);
}
DeriForm.propTypes = {
	id: PropTypes.number.isRequired,
	callback: PropTypes.func.isRequired,
};
