import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import { genInformePeriodo } from '../../repositories/solicitud';
import "./tabla.css";
import axios from 'axios';


export default function index() {
    const cookies = new Cookies();
    const cargoCookie = cookies.get('cargo');
    const [state, setState] = useState({
        fecha_i: '',
        fecha_f: '',
        informeData: [] // Estado para almacenar los datos del informe
    });

    const handleChange = (e) => {
			setState({ ...state, [e.target.name]: e.target.value });
    };
		
    useEffect(() => {
			if (cargoCookie !== 2) {
				window.location.href = '/';
			}
    }, []);
	let totalCLP = 0
	let totalUF = 0
    const submitForm = async (e) => {
        e.preventDefault();
        try {
					const response = await genInformePeriodo(state.fecha_i, state.fecha_f);
					setState({ ...state, informeData: response });
					alert("Informe Generado con exito.");
        } catch (error) {
					console.log(error);
					alert("Ha ocurrido un error al enviar el formulario.");
        }
			}
	const fetchApi = async (url) => {
		const response = await fetch(url)
		let info = await response.json();
		let value = info.UFs[0].Valor.replace(".", "");
		value = value.replace(",",".");

		return parseFloat(value);
	}

	const getUfvaluebyDate = async (date) => {
		const [year, month, day] = date.split("-");
		const url = `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/${year}/${month}/dias/${day}?apikey=931fadd3fa3041a89f09ff5dc4712fc66729df50&formato=json`;
		const response = await fetchApi(url);
		return response;
	}

	const fetchUfValueForDate = async (date) => {
		const ufValue = await getUfvaluebyDate(date);
		return ufValue;
	}

	useEffect(() => {
		// Obtener los valores de UF para todas las fechas necesarias
		const ufPromises = state.informeData.map(item => fetchUfValueForDate(item.fecha));
		Promise.all(ufPromises)
			.then(values => {
				// Almacenar los valores de UF en el estado
				const ufValues = {};
				state.informeData.forEach((item, index) => {
					ufValues[item.fecha] = values[index];
				});
				setState({ ...state, ufValues });
			})
			.catch(error => console.error("Error al obtener los valores de UF:", error));
	}, [state.informeData]);
		
    return (
        <div className="container mt-4 border border-primary">
            <form className="cbp-mc-form" onSubmit={submitForm}>
                <div className="cbp-mc-column">
                    <label htmlFor="fecha">Fecha Inicio</label>
                    <input
                        type="date"
                        id="fecha_i"
                        name="fecha_i"
                        value={state.fecha_i}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="cbp-mc-column">
                    <label htmlFor="fecha">Fecha Fin</label>
                    <input
                        type="date"
                        id="fecha_f"
                        name="fecha_f"
                        value={state.fecha_f}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="cbp-mc-submit-wrap">
                    <label htmlFor="fecha"></label>
                    <p> </p>
                    <input className="cbp-mc-submit" type="submit" value="Generar" />
                    <p> </p>
                </div>
            </form>

            {/* Tabla para mostrar los datos del informe */}
            <div>
                <h2>Informe</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Rut</th>
                            <th>Nombre</th>
							<th>Fecha</th>
							<th>Monto Total CLP</th>
							<th>Monto Total UF</th>
							<th>% Interes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.informeData.map((item, index) => {
                            // Obtener el valor de UF correspondiente a la fecha del informe
                            const ufValue = state.ufValues[item.fecha];
                            // Calcular el monto total en UF
                            const montoTotalUF = ufValue ? (item.monto_total / ufValue).toFixed(2) : 'Cargando...';
							totalUF = totalUF + parseFloat(montoTotalUF)
							totalCLP = totalCLP + item.monto_total
                            return (
                                <tr key={index}>
                                    <td>{item.rut}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.fecha}</td>
                                    <td>{item.monto_total.toLocaleString('en')}</td>
                                    <td>{montoTotalUF}</td>
                                    <td>{item.interes}%</td>
                                </tr>
                            );
                        })}
                    </tbody>
					
                </table>
				<div className="cbp-mc-center">
					{totalUF !== 0 ? <>
					<th>Total CLP: {totalCLP.toLocaleString('en')}</th>
					<th>Total UF: {totalUF.toLocaleString('en')}</th>
					
					</>	:
						<></>
				}
				</div>	
            </div>
        </div>
    );
}
