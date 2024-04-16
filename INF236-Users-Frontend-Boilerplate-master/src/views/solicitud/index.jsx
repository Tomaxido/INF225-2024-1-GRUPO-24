import React,{ useEffect } from "react";
import useSWR from "swr";


import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import DeleteForm from "../../views/solicitud/delete_soli";
import DeriForm from "./deri_soli";
import { deleteSoli, getAllSolis, deriSoli, getSoliByEjecutivo } from "../../repositories/solicitud";
import Cookies from 'universal-cookie';
import "./tabla.css";

export default function index() {
	const cookies = new Cookies();
	const cargoCookie = cookies.get('cargo');
	const userId = cookies.get('userId');
	useEffect(() => {
		if ( cargoCookie != 0){
		  window.location.href = '/';
		}
	  }, []);

		/*
		const { data, error } = useSWR("/solicitud/all", {
			fetcher: getAllSolis,
			initialData: [],
			revalidateOnMount: true,
		});
		*/
	const { data, error } = useSWR(`${userId}`, {
		fetcher: getSoliByEjecutivo,
		initialData: [],
		revalidateOnMount: true,
	});

	const valores = {
		0: 'No',
		1: 'Si',
	};
	const valores2 = {
		0: 'Pendiente',
		1: 'Aprobada',
		2: 'Rechazada',
	};
	const tbody = [];
	data.forEach(({ nombre, rut, id ,fecha,estado,derivada}) => {
		const a_mostrar1 = valores2[estado];
		const a_mostrar2 = valores[derivada];
		const showDeriForm = derivada === 0;
		const showDeleForm = derivada === 1;
		tbody.push(
			<tr>
				<td>{id}</td>
				<td>{rut}</td>
				<td>{nombre}</td>
				<td>{fecha}</td>
				<td>{a_mostrar1}</td>
				<td>{a_mostrar2}</td>
				<td>
					<Link to={`/solicitud/${id}`}>
						<button className="btn btn-success">Ver</button>
					</Link>
					{showDeriForm && <DeriForm id={id} callback={deriSoli} />}
					{!showDeleForm && <DeleteForm id={id} callback={deleteSoli} />}
				</td>
			</tr>
			
		);
	});
	
	return (
		<Container className="pt-4">
			<div className="d-flex align-items-center">
				<h1>Listado de Solicitudes</h1>
				<div class="ml-auto d-flex">
					<Link to="/solicitud/nuevo">
						<a href="/solicitud/nuevo" className="ml-4 btn btn-primary">
							Nueva Solicitud
						</a>
					</Link>
				</div>
			</div>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Id Solicitud</th>
						<th>Rut</th>
						<th>Nombre</th>
						<th>Fecha</th>
						<th>Estado</th>
						<th>¿Derivada?</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>{tbody}</tbody>
			</Table>
		</Container>
	);
}
