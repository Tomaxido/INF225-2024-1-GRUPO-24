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
              readonly
            />
            <label htmlFor="fecha">Fecha</label>
            <input
              type="text"
              id="fecha"
              name="fecha"
              value={data.fecha}
              readonly
            />
          </div>
          <div className="cbp-mc-column">
            <label htmlFor="monto_prestamo">Monto préstamo CLP</label>
            <input
              type="text"
              id="monto_prestamo"
              name="monto_prestamo"
              autoComplete="off"
              value={data.monto}
              readonly
            />
            <label>Cantidad Cuotas</label>
            <input
              id="n_cuotas"
              name="n_cuotas"
              value={data.n_cuotas}
              readonly
            />
            <div className="cbp-mc-submit-wrap">
            <label htmlFor="comments">Total UF</label>
                <input
                  id="comments"
                  name="motivo"
                  value={data.Total_UF}
                  readonly
                />
            <p></p>
              <label htmlFor="comments">Cuota en UF</label>
                <input
                  id="comments"
                  name="motivo"
                  value={data.Cuota_UF}
                  readonly
                />
            <p></p>
          </div>
          
          </div>
          <div className="cbp-mc-column">
            <label>Valor UF (Dia Simulacion)</label>
            <input
              id="n_cuotas"
              name="n_cuotas"
              value={data.UF}
              readonly
            />
            <label>Tasa Interes</label>
            <input
              id="n_cuotas"
              name="n_cuotas"
              value={`${data.interes}%`}
              readonly
            />
          </div>
          
          
        </form>
        
      </div>
	);
}
