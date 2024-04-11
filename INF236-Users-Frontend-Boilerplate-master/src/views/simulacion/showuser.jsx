import React from "react";
import useSWR from "swr";
import './diseño.css';
import { useParams } from "react-router-dom";
import { getsimu } from "../../repositories/simulaciones";

export default function show(props) {
  const { id } = useParams();

	const { data, error } = useSWR(id, {
		fetcher: getsimu,
		initialData: [],
		revalidateOnMount: true,
	});

	return (
		<div className="container mt-4 border border-primary">
      <form className="cbp-mc-form">
          <div className="cbp-mc-column">
            <label htmlFor="rut">RUT</label>
            <input
              type="text"
              id="rut"
              name="rut"
              autoComplete="off"
              maxLength="10"
              value={data.rut}
              placeholder="Ingrese el RUT (Sin puntos, con guión y Dígito Verificador)"
              readOnly
            />
            <label htmlFor="fecha">Fecha Simulacion</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={data.fecha}
              readOnly
            />
          </div>
          <div className="cbp-mc-column">

            <label htmlFor="monto_prestamo">Monto préstamo</label>
            <input
              type="text"
              id="monto_prestamo"
              name="monto_prestamo"
              autoComplete="off"
              value={data.monto}
              placeholder="Ingrese cantidad"
              readOnly
            />
            <label>Cantidad Cuotas</label>
            <input
              id="n_cuotas"
              name="n_cuotas"
              value={data.n_cuotas}
              readOnly
            />

            <label htmlFor="monto_prestamo">Valor Cuotas UF</label>
            <input
              type="text"
              id="precio_cuota"
              name="precio_cuota"
              autoComplete="off"
              value={data.Cuota_UF}
              placeholder=""
              readOnly
            />
          </div>
          
          <div className="cbp-mc-column">
          <label htmlFor="interes">Tasa interes (0-100)</label>
            <input
              type="text"
              id="interes"
              name="interes"
              pattern="[0-9]*" 
              autoComplete="off"
              value={`${data.interes}%`}
              placeholder="Ingrese un número"
              readOnly
            />
          </div>
        </form>
      </div>
	);
}
