import React from "react";
import useSWR from "swr";
import './diseño.css';

import { useParams } from "react-router-dom";
import { getSoli } from "../../repositories/solicitud";


export default function show(props) {
	const { id } = useParams();

	const { data, error } = useSWR(id, {
		fetcher: getSoli,
		initialData: [],
		revalidateOnMount: true,
	});

	const entero = data.tipo_prestamo;

	const opciones_prestamo = {
		0: 'No seleccionó ningún tipo de préstamo',
		1: 'Consumo',
		2: 'Comercial',
		3: 'Hipotecario',
		4: 'Tarjeta de Crédito',
		5: 'Línea de Crédito',
	};

	const a_mostrar = opciones_prestamo[entero];

	return (
		<div className="container mt-4 border border-primary">
        <form className="cbp-mc-form">
          <div className="cbp-mc-column">
            <label htmlFor="nombre">Nombre Completo</label>
			<input type="text" id="nombre" name="nombre" value={data.nombre} readonly/>
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
            <label htmlFor="oficio">Oficio</label>
            <input
              type="text"
              id="oficio"
              name="oficio"
              autoComplete="off"
              value={data.cargo}
              readonly
            />
          </div>
          <div className="cbp-mc-column">
            <label>Tipo Préstamo</label>
            <input
              id="tipo_prestamo"
              name="tipo_prestamo"
              value={a_mostrar}
              readonly
            />
            <label htmlFor="monto_prestamo">Monto préstamo</label>
            <input
              type="text"
              id="monto_prestamo"
              name="monto_prestamo"
              autoComplete="off"
              value={data.monto_total}
              readonly
            />
            <label>Cantidad Cuotas</label>
            <input
              id="n_cuotas"
              name="n_cuotas"
              value={data.n_cuotas}
              readonly
            />
			      <label htmlFor="comments">Cuota en UF</label>
            <input
              id="comments"
              name="motivo"
              value={data.precio_cuota}
              readonly
            />
          </div>
          <div className="cbp-mc-column">
            <label htmlFor="interes">Tasa Interes</label>
              <input
                id="interes"
                name="motivo"
                value={`${data.interes}%`}
                readonly
              />
            <label htmlFor="comments">Motivo</label>
            <input
              id="comments"
              name="motivo"
              value={data.motivo}
              readonly
            />

          </div>
        </form>
      </div>
	);
}
