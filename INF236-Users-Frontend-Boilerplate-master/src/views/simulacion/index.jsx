import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { addsimu } from '../../repositories/simulaciones';
import './diseño.css';
import axios from 'axios';


export default function Nuevo() {
    const history = useHistory();
    const [Uf, setUF] = useState()
    const url = `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=931fadd3fa3041a89f09ff5dc4712fc66729df50&formato=json`;
        const fetchApi = async () => {
              const response = await fetch(url)
              response.json().then(data => {
                  let valor = data.UFs[0].Valor;
                  setUF(valor)
              })
    }
    const [state, setState] = useState({
      fecha: getCurrentDate(),
      UF : parseInt(Uf),
    });
    useEffect(() => {
      fetchApi()
    }, [])
    const calcularCuotas = () => {
      const monto = parseFloat(state.monto_prestamo);
      const cuotas = parseInt(state.n_cuotas);
      const interes = parseFloat(state.interes/100)
      const monto_uf = monto / parseInt(Uf);
      if (!isNaN(monto) && !isNaN(cuotas) && cuotas > 0 && !isNaN(interes)) {
        const arriba = monto_uf
        const abajoA = (1-((1+interes)**(-cuotas)))
        const abajoB = interes
        const resultado = arriba / (abajoA / abajoB);
        setState((prevState) => ({
          ...prevState,
          precio_cuota: resultado.toFixed(2),
          Total_UF: (resultado*cuotas).toFixed(2),
          UF: parseFloat(Uf)
        }));
      } 
    };
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };
  
    const simuForm = async (e) => {
        e.preventDefault();
        try {
          const response = await addsimu(state);
          history.push(`/simular/listuser/${response.data.id}`);
          alert("Formulario enviado con éxito.");
        } catch (error) {
          alert("Ha ocurrido un error al enviar el formulario.");
        }
      }
    function getCurrentDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
      const day = String(currentDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }  
    return (
      <div className="container mt-4 border border-primary">
        <form className="cbp-mc-form" onSubmit={simuForm}>
          <div className="cbp-mc-column">
            <label htmlFor="rut">RUT</label>
            <input
              type="text"
              id="rut"
              name="rut"
              autoComplete="off"
              maxLength="10"
              value={state.rut}
              onChange={handleChange}
              placeholder="Ingrese el RUT (Sin puntos, con guión y Dígito Verificador)"
              required
            />
            <label htmlFor="fecha">Fecha Simulacion</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={state.fecha}
              onChange={handleChange}
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
              value={state.monto_prestamo}
              onChange={handleChange}
              placeholder="Ingrese cantidad"
              required
            />
            <label>Cantidad Cuotas</label>
            <select
              id="n_cuotas"
              name="n_cuotas"
              value={state.cantidad_cuotas}
              onChange={handleChange}
              required
            >
              <option value={0}>Seleccione la cantidad de cuotas.</option>
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
            </select>
            <label htmlFor="monto_prestamo">Valor Cuotas UF</label>
            <input
              type="text"
              id="precio_cuota"
              name="precio_cuota"
              autoComplete="off"
              value={state.precio_cuota}
              onChange={handleChange}
              placeholder=""
              readOnly
            />
          </div>
          
          <div className="cbp-mc-column">
          <label htmlFor="interes">Tasa interes (0-100)</label>
            <input
              type="number"
              id="interes"
              name="interes"
              pattern="[0-9]*" 
              autoComplete="off"
              value={state.interes}
              onChange={handleChange}
              placeholder="Ingrese un número"
              required
            />
          </div>
          <div className="cbp-mc-submit-wrap">
            <input className="cbp-mc-submit" type="submit" onClick={calcularCuotas} value="Simular" />
            <p> </p>
          </div>
        </form>
      </div>
    );
}

