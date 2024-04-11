import React from "react";
import PropTypes from "prop-types"; // ES6
import { mutate } from 'swr';

export default function DeleteForm({ id, callback }) {
	const deleteSoli = async (e) => {
		e.preventDefault();
		try {
			await callback(id);
			mutate("/solicitud/all");
			alert("Elemento recargado correctamente");
		} catch (error) {
			alert("A ocurrido un error al borrar la solicitud");
		}
	};
	return (
		<form onSubmit={deleteSoli} className="d-inline-block ml-4" action="">
			<input type="hidden" name="id" value={id} />
			<button onClick={deleteSoli} className="btn btn-danger" type="button">
				Borrar
			</button>
		</form>
	);
}
DeleteForm.propTypes = {
	id: PropTypes.number.isRequired,
	callback: PropTypes.func.isRequired,
};
