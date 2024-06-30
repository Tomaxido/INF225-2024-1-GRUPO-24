import React, {useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { addsolicitud } from '../../repositories/solicitud';
import './diseño.css';
import Cookies from 'universal-cookie';


export default function Nuevo() {
    const cookies = new Cookies();
    const userId = cookies.get('userId');
    
    const history = useHistory();
    const [Uf, setUF] = useState();
    const [cuota_uf, setCuota_uf] = useState("");
    const url = `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=931fadd3fa3041a89f09ff5dc4712fc66729df50&formato=json`;
        const fetchApi = async () => {
              const response = await fetch(url)
              response.json().then(data => {
                  let valor = data.UFs[0].Valor;
                  setUF(valor)
              })
    }
    const [state, setState] = useState({
      userId: userId,
      fecha: getCurrentDate(),
      estado: 0,
      derivada: 0,
    });
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };
  
    const submitForm = async (e) => {
        e.preventDefault();
        try {
          const response = await addsolicitud(state);
          history.push(`/solicitud/${response.data.id}`);
          alert("Formulario enviado con éxito.");
        } catch (error) {
          console.log(error);
          alert("Ha ocurrido un error al enviar el formulario.");
        }
      }
    useEffect(() => {
      fetchApi()
    }, [])

    useEffect(() => {
      const monto = parseFloat(state.monto_prestamo);
      const cuotas = parseInt(state.n_cuotas);
      const interes = parseFloat(state.interes/100)
      const monto_uf = monto / parseInt(Uf);
      if (!isNaN(monto) && !isNaN(cuotas) && cuotas > 0 && !isNaN(interes)) {
        const arriba = monto_uf
        const abajoA = (1-((1+interes)**(-cuotas)))
        const abajoB = interes
        let resultado = arriba / (abajoA / abajoB);

        setState((prevState) => ({
          ...prevState,
          precio_cuota: (isNaN(resultado.toFixed(2)) ? "" : resultado.toFixed(2)),
        }));

      } 

    },[state.monto_prestamo, state.n_cuotas, state.interes]);
    
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
        }));
      } 
    };
    function getCurrentDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Añade un 0 al principio si es necesario
      const day = String(currentDate.getDate()).padStart(2, '0'); // Añade un 0 al principio si es necesario
      return `${year}-${month}-${day}`;
    }  
    return (
      <div className="container mt-4 border border-primary">
        <form className="cbp-mc-form" onSubmit={submitForm}>
          <div className="cbp-mc-column">
            <label htmlFor="nombre">Nombre Completo</label>
             <input
                type="text"
                id="nombre"
                name="nombre"
                value={state.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre completo"
                required
              />
            <label htmlFor="rut">RUT</label>
            <input
              type="number"
              id="rut"
              name="rut"
              autoComplete="off"
              value={state.rut}
              onChange={handleChange}
              placeholder="Ingrese el RUT (Sin puntos, con guión y Dígito Verificador)"
              required
            />
            <label htmlFor="fecha">Fecha Solicitud</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={state.fecha}
              onChange={handleChange}
              readOnly
            />
            <label htmlFor="oficio">Oficio</label>
            <input
              type="text"
              id="oficio"
              name="oficio"
              autoComplete="off"
              value={state.oficio}
              onChange={handleChange}
              placeholder="Ingrese el oficio"
              required
            />
          </div>
          <div className="cbp-mc-column">
            <label>Tipo Préstamo</label>
            <select
              id="tipo_prestamo"
              name="tipo_prestamo"
              value={state.tipo_prestamo}
              onChange={handleChange}
              required
            >
              <option>Seleccione el tipo de préstamo.</option>
              <option value={1}>Consumo</option>
              <option value={2}>Comercial</option>
              <option value={3}>Hipotecario</option>
              <option value={4}>Tarjeta de Crédito</option>
              <option value={5}>Línea de Crédito</option>
            </select>

            <label htmlFor="monto_prestamo">Monto préstamo</label>
            <input
              type="number"
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
              value={state.n_cuotas}
              onChange={handleChange} 
              required
            >
              <option>Seleccione la cantidad de cuotas.</option>
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
              
            </select>
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
          
          <div className="cbp-mc-column">
            <label>Cuota en UF</label>
              <div class="input-group">
              <input id="precio_cuota" name="precio_cuota" 
              value={state.precio_cuota} 
              onChange={handleChange} 
              readOnly 
              required Class="form-control" />

            </div>
            <label htmlFor="comments">Motivo</label>
            <textarea
              id="comments"
              name="motivo"
              value={state.motivo}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="cbp-mc-submit-wrap">
            <input className="cbp-mc-submit" type="submit" value="Enviar" />
            <p> </p>
          </div>
        </form>
        


      </div>
    );
}

