import './styles.css'
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';


const RequestTravel: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { origin, destination, distance, duration, options } = location.state.data;
    const { customerId } = location.state;

    const handleConfirm = async (driver: any) => {
        try {
            await api.patch('/ride/confirm', {
                customer_id: customerId,
                origin,
                destination,
                distance,
                duration,
                driver: {id: driver.id, name: driver.name},
                value: driver.value,
            });   
            

            navigate('/history', { state: { customerId } });
        } catch (error) {
            console.error('Erro ao confirmar a viagem:', error);
            alert('Erro ao confirmar a viagem. Por favor, tente novamente.');
        }
    };

    // URL do mapa estático usando a API do Google Maps
    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x300&path=enc
    :ROTA_ENCODED&markers=color:green|label:A|${origin.latitude},${origin.longitude}
    &markers=color:red|label:B|${destination.latitude},${destination.longitude}
    &AIzaSyCKeTpTsbvTnOENUPYJmRSehvPepCBSb-A`;

    return (
        <div className='container'>
            <div className='container-map'>
                <h3 className='map-title'>Mapa da Rota</h3>
                <img
                    className='map'
                    src={staticMapUrl}
                    alt="Mapa com a rota"
                    style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '20px' }}
                />
            </div>

            <h2 className='request-title'>Detalhes da Viagem</h2>

            <div className='container-detalhes'>
                <p className='detalhes'> <span className='detalhes-title'>Origem:</span> Latitude {origin.latitude}, Longitude {origin.longitude}</p>
                <p className='detalhes'> <span className='detalhes-title'>Destino:</span>Latitude {destination.latitude}, Longitude {destination.longitude}</p>
                <p className='detalhes'> <span className='detalhes-title'>Distância:</span> {distance} km</p>
                <p className='detalhes'> <span className='detalhes-title'>Duração:</span> {duration}</p>
            </div>

            <h3 className='motoristas-title'>Motoristas Disponíveis</h3>
            {options.map((driver: any) => (
                <div className='motoristas-container' key={driver.id} >
                    <h4>{driver.name}</h4>
                    <p><strong>Descrição:</strong> {driver.description}</p>
                    <p><strong>Veículo:</strong> {driver.vehicle}</p>
                    <p><strong>Avaliação:</strong> {driver.review.rating}/5</p>
                    <p><strong>Valor:</strong> R$ {driver.value }</p>
                    <button
                        className='request-button'
                        onClick={() => handleConfirm(driver)}
                    >
                        Escolher
                    </button>
                </div>
            ))}
        </div>
    );
};

export default RequestTravel;