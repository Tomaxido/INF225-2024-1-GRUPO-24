import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function CerrarSesion() {
  useEffect(() => {
    if (!cookies.get('nombre')) {
      window.location.href = './';
    } else {
      cerrarSesion();
    }
  }, []);

  const cerrarSesion = () => {
    cookies.remove('id', { path: '/' });
    cookies.remove('nombre', { path: '/' });
    window.location.href = './';
  }

  console.log('nombre: ' + cookies.get('nombre'));

  return (
    <div>
      {/* Aquí puedes agregar el contenido de tu componente */}
    </div>
  );
}

export default CerrarSesion;
