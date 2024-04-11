import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

import {
  Link,
} from "react-router-dom";

import './slide.css';

export default function Sidebar() {
    const nombreCookie = cookies.get('nombre');
    let supervisor = false;
    if (nombreCookie == "Supervisor"){
        supervisor = true
    }
    return (
        
        <Navbar className="bg-light">
            <Nav defaultActiveKey="/" className="flex-column sidebar-sticky">
                <Link to="/">
                <Nav.Link href="/">Inicio</Nav.Link>
                </Link>
                {!nombreCookie && (
                <Link to="/simular">
                    <Nav.Link href="/simular">Simular</Nav.Link>
                </Link>
                )}
                {!nombreCookie && (
                <Link to="/simular/listuser">
                    <Nav.Link href="/simular/listuser">Listado Simulaciones</Nav.Link>
                </Link>
                )}
                {!nombreCookie && (
                <Link to="/login">
                    <Nav.Link href="/login">Acceso Funcionarios</Nav.Link>
                </Link>
                )}
                {nombreCookie && supervisor && (
                <Link to="/derivados">
                    <Nav.Link href="/derivados">Solicitudes Derivadas</Nav.Link>
                </Link>
                )}
                {nombreCookie && !supervisor && (
                <>
                    <Link to="/solicitud">
                    <Nav.Link href="/solicitud">Solicitudes</Nav.Link>
                    </Link>
                    <Link to="/simular/list">
                    <Nav.Link href="/simular/list">Simulaciones</Nav.Link>
                    </Link>
                </>
                )}
                {nombreCookie && (
                <Link to="/login/cerrar_sesion">
                    <Nav.Link href="/cerrar_sesion">Cerrar Sesión</Nav.Link>
                </Link>
                )}
            </Nav>

        </Navbar>
    )
}
