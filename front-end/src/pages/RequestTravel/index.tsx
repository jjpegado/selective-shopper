import './styles.css'
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { api } from '../../services/api';
import { toast } from 'react-toastify';


const RequestTravel: React.FC = () => {
    const [customerId, setCustomerId] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!customerId || !origin || !destination) {
            toast('Todos os campos devem ser preenchidos.');
            return;
        }

        if (origin === destination) {
            toast('Origem e destino devem ser diferentes.');
            return;
        }

        try {
            const response = await api.post('/ride/estimate', {
                customer_id: customerId,
                origin,
                destination,
            });

            const { data } = response;  

            navigate('/options', { state: { customerId, data } });

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <form className='request-form' onSubmit={handleSubmit}>
            <h2 className='request-title'>Solicitar Viagem</h2>
            <input
            className='request-input'
                type="text"
                placeholder="ID do Usuário"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                
            />
            <input
            className='request-input'
                type="text"
                placeholder="Origem"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                
            />
            <input
                className='request-input'
                type="text"
                placeholder="Destino"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                
            />
            <button className='request-button' type="submit">Estimar Valor</button>
        </form>
    );
};

export default RequestTravel;


