import React from 'react'
import imgfondo from './HomeFondo/fondo.jpg';

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Asegura que el contenedor ocupe toda la altura de la ventana
      backgroundImage: `url(${imgfondo})`, // Ruta de tu imagen de fondo
      backgroundSize: 'cover', // Ajusta el tamaño de la imagen para cubrir todo el contenedor
      backgroundPosition: 'center', // Centra la imagen
      color: 'black', // Color del texto para asegurar visibilidad sobre la imagen
    },
  };

export default function Home() {
    return (
            <div style={styles.container}>
                <h1>Bienvenido a La financiera</h1>
            </div>
        )
}   