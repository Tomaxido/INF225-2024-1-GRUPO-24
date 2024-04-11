import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { getAllSolis } from "../../repositories/derivados";
import { getSoli } from "../../repositories/solicitud";
import Cookies from 'universal-cookie';

export default function index() {
  const cookies = new Cookies();
  const nombreCookie = cookies.get('nombre');
  
  const [derivadosData, setDerivadosData] = useState([]);
  const [solicitudesData, setSolicitudesData] = useState([]);

  useEffect(() => {
    if (nombreCookie !== "Supervisor") {
      window.location.href = '/';
    }

    // Cargar los datos iniciales de derivados
    const fetchDerivadosData = async () => {
      try {
        const response = await getAllSolis();
        setDerivadosData(response);
      } catch (error) {
        console.error("Error al cargar los derivados", error);
      }
    };

    fetchDerivadosData();
  }, [nombreCookie]);

  useEffect(() => {
    // Cargar los datos iniciales de solicitudes
    const fetchSolicitudesData = async () => {
      try {
        const promises = derivadosData.map(({ id }) => getSoli(id));
        const responses = await Promise.all(promises);
        setSolicitudesData(responses);
      } catch (error) {
        console.error("Error al cargar las solicitudes", error);
      }
    };

    fetchSolicitudesData();
  }, [derivadosData]);

  const valores2 = {
    0: 'Pendiente',
    1: 'Aprobada',
    2: 'Rechazada',
  };

  const tbody = solicitudesData.map(({ id, rut, nombre, fecha, estado }) => (
    <tr key={id}>
      <td>{id}</td>
      <td>{rut}</td>
      <td>{nombre}</td>
      <td>{fecha}</td>
      <td>{valores2[estado]}</td>
      <td>
        <Link to={`/derivados/${id}`}>
          <button className="btn btn-success">Ver</button>
        </Link>
      </td>
    </tr>
  ));

  return (
    <Container className="pt-4">
      <div className="d-flex align-items-center">
        <h1>Listado de Solicitudes Derivadas</h1>
        <div className="ml-auto d-flex"></div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id Solicitud</th>
            <th>Rut</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </Table>
    </Container>
  );
}
