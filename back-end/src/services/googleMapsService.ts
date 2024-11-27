import axios from 'axios';

const API_KEY = process.env.GOOGLE_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/directions/json';

interface RouteResponse {
    distance: number;
    duration: string;
    startLocation: { lat: number; lng: number };
    endLocation: { lat: number; lng: number };
}

export const getRoute = async (origin: string, destination: string): Promise<RouteResponse> => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                origin,
                destination,
                key: API_KEY,
            },
        });

        const { routes } = response.data;

        if (!routes || routes.length === 0) {
            throw new Error('Nenhuma rota encontrada.');
        }

        const route = routes[0].legs[0];

        return {
            distance: route.distance.value / 1000,
            duration: route.duration.text,
            startLocation: route.start_location,
            endLocation: route.end_location,
        };
    } catch (error) {
        throw new Error(`Erro ao buscar rota: ${error}`);
    }
};
