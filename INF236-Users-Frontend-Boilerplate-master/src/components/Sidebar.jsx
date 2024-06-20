import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from 'universal-cookie';

import { NavLink } from "react-router-dom";
import './slide.css';

const cookies = new Cookies();

import {
  Link,
} from "react-router-dom";

import './slide.css';

export default function Sidebar() {
    const nombreCookie = cookies.get('nombre')
    const cargo = cookies.get('cargo');
    let supervisor = false;
    let analista = false;
    if (cargo == "1"){
        supervisor = true
    }
    if (cargo == "2"){
        analista = true
    }
    return (
        <Navbar className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark vh-100">
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to="/" exact className="nav-link" activeClassName="active">
                        Inicio
                    </NavLink>
                </li>
                {!nombreCookie && (
                    <li className="nav-item">
                        <NavLink to="/simular" exact className="nav-link" activeClassName="active">
                            Simular
                        </NavLink>
                    </li>
                )}
                {!nombreCookie && (
                    <li className="nav-item">
                        <NavLink to="/simular/listuser" exact className="nav-link" activeClassName="active">
                            Listado Simulaciones
                        </NavLink>
                    </li>
                )}
                {!nombreCookie && (
                    <li className="nav-item">
                        <NavLink to="/login" className="nav-link" activeClassName="active">
                            Acceso Funcionarios
                        </NavLink>
                    </li>
                )}
                {nombreCookie && supervisor && (
                    <li className="nav-item">
                        <NavLink to="/derivados" className="nav-link" activeClassName="active">
                            Solicitudes Derivadas
                        </NavLink>
                    </li>
                )}
                {nombreCookie && !supervisor && !analista && (
                    <>
                        <li className="nav-item">
                            <NavLink to="/solicitud" exact className="nav-link" activeClassName="active">
                                Solicitudes
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/simular/list" exact className="nav-link" activeClassName="active">
                                Simulaciones
                            </NavLink>
                        </li>
                    </>
                )}
                {nombreCookie && !supervisor && analista && (
                    <li className="nav-item">
                        <NavLink to="/informe-periodo" className="nav-link" activeClassName="active">
                            Informe Monto Total en un Periodo
                        </NavLink>
                    </li>
                )}
                {nombreCookie && !supervisor && analista && (
                    <li className="nav-item">
                        <NavLink to="/conversion-cuotas" className="nav-link" activeClassName="active">
                            Conversión de Cuotas
                        </NavLink>
                    </li>
                )}
                {nombreCookie && (
                    <li className="nav-item">
                        <NavLink to="/login/cerrar_sesion" className="nav-link" activeClassName="active">
                            Cerrar Sesión
                        </NavLink>
                    </li>
                )}
            </ul>
        </Navbar>
    )
}
