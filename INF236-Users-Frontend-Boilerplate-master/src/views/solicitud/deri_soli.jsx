import React from "react";
import PropTypes from "prop-types"; // ES6
import { mutate } from 'swr';
import { updateDeriSoli } from "../../repositories/solicitud";

export default function DeriForm({ id, callback }) {
	const deriSoli = async (e) => {
		e.preventDefault();
		try {
			await callback(id);
            await updateDeriSoli(id);
			mutate("/solicitud/all");
			alert("Solicitud Derivada correctamente");
		} catch (error) {
			alert("A ocurrido un error al derivar la solicitud");
		}
	};
	return (
		<form onSubmit={deriSoli} className="d-inline-block ml-4" action="">
			<input type="hidden" name="id" value={id} />
			<button onClick={deriSoli} className="btn btn-warning" type="button">
				Derivar
			</button>
		</form>
	);
}
DeriForm.propTypes = {
	id: PropTypes.number.isRequired,
	callback: PropTypes.func.isRequired,
};
