import React, { useState, useEffect } from 'react';
import './login.css';
import Cookies from 'universal-cookie';
import { getBynombre } from "../../repositories/user";

const cookies = new Cookies();

function Login() {
  const [state, setState] = useState({});
  const [error, setError] = useState('');

  const iniciarSesion = async () => {
    try {
      const response = await getBynombre(state.nombre,state.pass);
      if (response.length > 0) { 
        const respuesta = response[0];
        cookies.set('nombre', respuesta.nombre, { path: '/' });
        alert(`Bienvenido ${respuesta.nombre}`);
        window.location.href = '/';
      } else {
        setError('El usuario o la contraseña no son correctos');
      }
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    if (cookies.get('nombre')) {
      window.location.href = '/';
    }
  }, []);

  return (
    <div id="contenedor">
      <div id="central">
        <div id="login">
          <div className="titulo">Iniciar Sesión</div>
            <div>
              <label className="text-white">Nombre de usuario: </label>
              <input
                type="text"
                value={state.nombre}
                onChange={(e) => setState({ ...state, nombre: e.target.value })}
              />
            </div>
            <div>
              <label className="text-white">Contraseña: </label>
              <input
                type="password"
                value={state.pass}
                onChange={(e) => setState({ ...state, pass: e.target.value })}
              />
            </div>
            <button className="btn btn-primary" onClick={()=> iniciarSesion()}>Iniciar Sesión</button>
          <p className="text-white">{error}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
