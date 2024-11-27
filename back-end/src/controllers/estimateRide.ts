import { Request, Response, NextFunction } from 'express';
import { getRoute } from '../services/googleMapsService'; 
import { knex } from '../db/conexao'; 

interface RouteResponse {
    distance: number;
    duration: string;
    startLocation: { lat: number; lng: number };
    endLocation: { lat: number; lng: number };
}

export const estimateRide = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { customer_id, origin, destination } = req.body;


    if (!customer_id || !origin || !destination) {
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Todos os campos são obrigatórios",
        });
        return;
    }

    if (origin === destination) {
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Origem e destino não podem ser iguais",
        });
        return;
    }

    try {
        const route: RouteResponse = await getRoute(origin, destination);

        const availableDrivers = await knex('drivers')
            .where('minkm', '<=', route.distance)  
            .select('*'); 

        const driversWithValues = availableDrivers.map(driver => ({
            id: driver.id,
            name: driver.name,
            description: driver.description,
            vehicle: driver.vehicle,
            review: {
                rating: driver.rating,
                comment: `${driver.name} é um motorista ${driver.description}.`,
            },
            value: driver.rate * route.distance,  
        }));


        driversWithValues.sort((a, b) => a.value - b.value);


        res.status(200).json({
            origin: {
                latitude: route.startLocation.lat,
                longitude: route.startLocation.lng,
            },
            destination: {
                latitude: route.endLocation.lat,
                longitude: route.endLocation.lng,
            },
            distance: route.distance,
            duration: route.duration,
            options: driversWithValues,  
            routeResponse: route,  
        });

    } catch (error) {
        const err = error as Error;
        if (err.message.includes('Nenhuma rota encontrada')) {
            res.status(400).json({
                error_code: "NO_ROUTE",
                error_description: "Não foi possível calcular uma rota entre os endereços fornecidos.",
            });
        } else {
            next(err);
        }
    }
};
