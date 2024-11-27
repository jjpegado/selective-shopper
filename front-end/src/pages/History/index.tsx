import './styles.css'
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../services/api';


const History: React.FC = () => {
    const [driverId, setDriverId] = useState('');
    const [rides, setRides] = useState([]);
    const location = useLocation();
    const { customerId } = location.state || {}; 
    
    const handleSearch = async () => {
        try {
            const response = await api.get(`/ride/${customerId}`, {
                params: { driver_id: driverId || undefined },
            });
            setRides(response.data.rides);
            console.log(response.data.rides);
            
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className='container-history'>
            <h2 className='title-history'>Histórico de Viagens</h2>
            <p className='id-user'>ID do Usuário: {customerId}</p>
            
            <select className='select-driver' onChange={(e) => setDriverId(e.target.value)}>
                <option value="">Todos os motoristas</option>
                <option value="1">Homer Simpson</option>
                <option value="2">Dominic Toretto</option>
                <option value="3">James Bond</option>
            </select>
            <button className='request-button' onClick={handleSearch}>Filtrar</button>
        
            <div >
                {rides.map((ride: any) => (
                    <div className='rides-list' key={ride.id}>
                        <p>Data: {ride.date}</p>
                        <p>Motorista: {ride.driver.id}</p>
                        <p>Origem: {ride.origin}</p>
                        <p>Destino: {ride.destination}</p>
                        <p>Distância: {ride.distance} km</p>
                        <p>Tempo: {ride.duration}</p>
                        <p>Valor: R$ {ride.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;