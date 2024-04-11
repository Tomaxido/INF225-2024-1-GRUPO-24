import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUser } from "../../repositories/user";

export default function create() {
	const history = useHistory();

	const [state, setstate] = useState({});

	const submitForm = async (e) => {
		e.preventDefault();
		try {
			const response = await createUser(state);
			history.push(`/users/${response.data.id}`);
		} catch (error) {
			console.log(error);
			alert("A ocurrido un error al actualizar");
		}
	};

	return (
		<div className="container mt-4">
			<form onSubmit={submitForm}>
				<div className="form-group">
					<label htmlFor="nombre">Nombre</label>
					<input
						className="form-control"
						id="nombre"
						type="text"
						value={state.nombre}
						onChange={(e) => {
							setstate({ ...state, nombre: e.target.value });
						}}
						placeholder="Ingrese Nombre"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						className="form-control"
						id="email"
						type="email"
						value={state.email}
						onChange={(e) => {
							setstate({ ...state, email: e.target.value });
						}}
						placeholder="Ingrese Email"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="cargo">Cargo</label>
					<input
						className="form-control"
						id="cargo"
						type="number"
						value={state.cargo}
						onChange={(e) => {
							setstate({ ...state, cargo: e.target.value });
						}}
						placeholder="Ingrese Cargo"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="pass">Contraseña</label>
					<input
						className="form-control"
						id="pass"
						type="password"
						value={state.pass}
						onChange={(e) => {
							setstate({ ...state, pass: e.target.value });
						}}
						placeholder="Ingrese Contraseña"
						required
					/>
				</div>
				<div className="float-right">
					<button type="submit" className="btn btn-primary">
						Guardar
					</button>
				</div>
			</form>
		</div>
	);
}
