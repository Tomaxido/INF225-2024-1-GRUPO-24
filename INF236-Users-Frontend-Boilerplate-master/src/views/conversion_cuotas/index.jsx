import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Cookies from 'universal-cookie';
import { getAllSolis } from '../../repositories/solicitud';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root'); // Configura el elemento raíz para accesibilidad

export default function Index() {
    const cookies = new Cookies();
    const cargoCookie = cookies.get('cargo');

    const [state, setState] = useState({
        informeData: [],
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [euroValueC, setEuroValueC] = useState(null);
    const [clpValueC, setCLPValueC] = useState(null);
    const [utmValueC, setUtmValueC] = useState(null);
    const [dolarValueC, setDolarValueC] = useState(null);
    const [euroValueM, setEuroValueM] = useState(null);
    const [ufValueM, setUFValueM] = useState(null);
    const [utmValueM, setUtmValueM] = useState(null);
    const [dolarValueM, setDolarValueM] = useState(null);


    const getEuroValueByDate = async (date, monto) => {
        const [year, month, day] = date.split("-");
        let euroUrl = `https://api.cmfchile.cl/api-sbifv3/recursos_api/euro/${year}/${month}/dias/${day}?apikey=931fadd3fa3041a89f09ff5dc4712fc66729df50&formato=json`;

        try {
            const response = await axios.get(euroUrl);
            console.log(response);
            if (response.data && response.data.Euros && response.data.Euros.length > 0) {
                const euroValue = parseFloat(response.data.Euros[0].Valor.replace(',', '.'));
                return monto / euroValue;
            } else {
                console.error("No se encontró el valor del euro para la fecha especificada.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching Euro data:", error);
            return null;
        }
    };

    const getUFValueByDate = async (date, monto) => {
        const [year, month, day] = date.split("-");
        let ufUrl = `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/${year}/${month}/dias/${day}?apikey=931fadd3fa3041a89f09ff5dc4712fc66729df50&formato=json`;

        try {
            const response = await axios.get(ufUrl);
            if (response.data && response.data.UFs && response.data.UFs.length > 0) {
                const ufValue = parseFloat(response.data.UFs[0].Valor);
                return monto * ufValue;
            } else {
                console.error("No se encontró el valor del UF para la fecha especificada.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching UF data:", error);
            return null;
        }
    };

    const getUFValueByDate2 = async (date, monto) => {
        const [year, month, day] = date.split("-");
        let ufUrl = `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/${year}/${month}/dias/${day}?apikey=931fadd3fa3041a89f09ff5dc4712fc66729df50&formato=json`;

        try {
            const response = await axios.get(ufUrl);
            if (response.data && response.data.UFs && response.data.UFs.length > 0) {
                const ufValue = parseFloat(response.data.UFs[0].Valor);
                return monto / ufValue;
            } else {
                console.error("No se encontró el valor del UF para la fecha especificada.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching UF data:", error);
            return null;
        }
    };

    const getUTMValueByDate = async (date, monto) => {
        const [year, month, day] = date.split("-");
        let utmUrl = `https://api.cmfchile.cl/api-sbifv3/recursos_api/utm/${year}/${month}/?apikey=931fadd3fa3041a89f09ff5dc4712fc66729df50&formato=json`;

        try {
            const response = await axios.get(utmUrl);
            if (response.data && response.data.UTMs && response.data.UTMs.length > 0) {
                const utmValue = parseFloat(response.data.UTMs[0].Valor);
                return monto / utmValue;
            } else {
                console.error("No se encontró el valor del UF para la fecha especificada.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching UF data:", error);
            return null;
        }
    };
    const getDolarValueByDate = async (date, monto) => {
        const [year, month, day] = date.split("-");
        let dolarUrl = `https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar/${year}/${month}/dias/${day}?apikey=931fadd3fa3041a89f09ff5dc4712fc66729df50&formato=json`;

        try {
            const response = await axios.get(dolarUrl);
            if (response.data && response.data.Dolares && response.data.Dolares.length > 0) {
                const dolarValue = parseFloat(response.data.Dolares[0].Valor.replace(',', '.'));
                return monto / dolarValue;
            } else {
                console.error("No se encontró el valor del UF para la fecha especificada.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching UF data:", error);
            return null;
        }
    };
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };
    
    useEffect(() => {
        if (cargoCookie !== 2) {
            window.location.href = '/';
        }
    }, []);

    const { data, error } = useSWR("/solicitud/all", {
        fetcher: getAllSolis,
        initialData: [],
        revalidateOnMount: true,
    });

    useEffect(() => {
        if (data) {
            setState((prevState) => ({ ...prevState, informeData: data }));
        }
    }, [data]);

    const openModal = async (item) => {
        setSelectedData(item);
        setModalIsOpen(true);

        // Fetch the conversion values when the modal is opened
        const monto = Number(item.precio_cuota.replace(',', '.'));
        const clpValueC = await getUFValueByDate(item.fecha, monto);

        const euroValueC = await getEuroValueByDate(item.fecha, clpValueC);
        const utmValueC = await getUTMValueByDate(item.fecha, clpValueC);
        const dolarValueC = await getDolarValueByDate(item.fecha, clpValueC);

        const clpValueM = item.monto_total;
        const euroValueM = await getEuroValueByDate(item.fecha, clpValueM);
        const ufValueM = await getUFValueByDate2(item.fecha, clpValueM);
        const utmValueM = await getUTMValueByDate(item.fecha, clpValueM);
        const dolarValueM = await getDolarValueByDate(item.fecha, clpValueM);

        setEuroValueC(euroValueC.toFixed(2));
        setUtmValueC(utmValueC.toFixed(2));
        setCLPValueC(clpValueC.toFixed(2));
        setDolarValueC(dolarValueC.toFixed(2));

        
        setEuroValueM(euroValueM.toFixed(2));
        setUtmValueM(utmValueM.toFixed(2));
        setUFValueM(ufValueM.toFixed(2));
        setDolarValueM(dolarValueM.toFixed(2))
        
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedData(null);

        setEuroValueC(null); 
        setUtmValueC(null);
        setCLPValueC(null);
        setDolarValueC(null);

        setEuroValueM(null); 
        setUtmValueM(null);
        setUFValueM(null);
        setDolarValueM(null)
    };

    if (error) return <div>Error loading data</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="container mt-4 border border-primary" style={{ width: '100%', margin: '0 auto' }}>
            <div>
                <h2>Solicitudes a convertir</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Rut</th>
                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.informeData.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.rut}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.fecha}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => openModal(item)}>Ver</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Detalles de la Solicitud"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                    content: {
                        color: 'black',
                        top: '50%',
                        left: '50%',
                        right: '800%',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    },
                }}
            >
                {selectedData ? (
                    <div>
                        <h2>Conversiones</h2>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1, paddingRight: '10px' }}>
                                <p><strong>Nombre:</strong> {selectedData.nombre}</p>
                                <p><strong>Fecha:</strong> {selectedData.fecha}</p>
                                <p><strong>Monto UF:</strong> {ufValueM} </p>
                                <p><strong>Monto CLP:</strong> {selectedData.monto_total}</p>
                                <p><strong>Monto UTM:</strong> {utmValueM}</p>
                                <p><strong>Monto Euro:</strong> {euroValueM}</p>
                                <p><strong>Monto Dolar:</strong> {dolarValueM}</p>
                            </div>
                            <div style={{ flex: 1, paddingLeft: '10px' }}>
                                <p><strong>RUT:</strong> {selectedData.rut}</p>
                                <p><strong>Tasa interes: </strong>{selectedData.interes} %</p>
                                <p><strong>Cuota UF:</strong> {selectedData.precio_cuota}</p>
                                <p><strong>Cuota CLP:</strong> {clpValueC}</p>
                                <p><strong>Cuota UTM:</strong> {utmValueC}</p>
                                <p><strong>Cuota Euro:</strong> {euroValueC}</p>
                                <p><strong>Cuota Dolar:</strong> {dolarValueC}</p>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={closeModal}>Cerrar</button>
                    </div>
                ) : (
                    <div>Cargando...</div>
                )}
            </Modal>
        </div>
    );
}
