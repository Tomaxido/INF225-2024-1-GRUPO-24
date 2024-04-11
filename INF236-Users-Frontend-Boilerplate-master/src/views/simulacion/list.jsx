import React, { useState } from "react";
import useSWR from "swr";
import './diseño.css';

import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { getAllsimu } from "../../repositories/simulaciones";

export default function Index() {
  const [filterRut, setFilterRut] = useState(""); // Estado para el valor del filtro
  const { data, error } = useSWR("/simulacion/all", {
    fetcher: getAllsimu,
    initialData: [],
    revalidateOnMount: true,
  });

  const tbody = data
    .filter(({ rut }) => (filterRut ? String(rut).includes(filterRut) : true))
    .map(({ id, rut, fecha, monto }) => (
      <tr key={id}>
        <td>{rut}</td>
        <td>{fecha}</td>
        <td>{monto}</td>
        <td>
          <Link to={`/simular/list/${id}`}>
            <button className="btn btn-success">Ver</button>
          </Link>
        </td>
      </tr>
    ));

  return (
    <Container className="pt-4">
      <div className="d-flex align-items-center">
        <h1>Listado de Simulaciones</h1>
        <div className="ml-auto d-flex">
          <input
            type="text"
            id="rut"
            name="rut"
            autoComplete="off"
            maxLength="10"
            placeholder="Filtrar por RUT"
            value={filterRut}
            onChange={(e) => setFilterRut(e.target.value)}
            required
          />
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rut</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </Table>
    </Container>
  );
}
