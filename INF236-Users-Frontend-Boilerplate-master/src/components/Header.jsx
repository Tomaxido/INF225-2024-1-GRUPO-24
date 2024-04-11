import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Header() {
    const [Uf, setUF] = useState()
    const [nombre, setNombre] = useState('');
    const url = "https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=931fadd3fa3041a89f09ff5dc4712fc66729df50&formato=json"
    const fetchApi = async () => {
        const response = await fetch(url)
        response.json().then(data => {
            let valor = data.UFs[0].Valor;
            setUF(valor)
        })
    }
    useEffect(() => {
        fetchApi()
        const nombreCookie = cookies.get('nombre');
        if (nombreCookie) {
            setNombre(nombreCookie);
        }
    }, [])
    return (
        <Navbar bg="dark" variant="dark" className="d-flex justify-content-between align-items-center">
            <Navbar.Brand href="/">
            <div>Financiera La Clave</div>
            
            </Navbar.Brand>
            <div className="text-white">Valor actual de la UF: { !Uf ? 'cargando' : Uf} CLP </div>
            <div className="text-white">Bienvenido { !nombre ? 'Cliente' : nombre} </div>
        </Navbar>
    )
}

