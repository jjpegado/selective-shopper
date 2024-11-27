import { Request, Response, NextFunction } from 'express';
import { knex } from '../db/conexao'; 


export const getRides = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { customer_id } = req.params; 
    const { driver_id } = req.query;


    if (!customer_id) {
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "O id do usuário é obrigatório",
        });
        return
    }

    try {

        let query = knex('rides')
            .where('customer_id', customer_id)
            .orderBy('created_at', 'desc');

        if (driver_id) {
            const driverExists = await knex('drivers')
                .where('id', driver_id)
                .first();

            if (!driverExists) {
                res.status(400).json({
                    error_code: "INVALID_DRIVER",
                    error_description: "Motorista inválido",
                });
                return
            }

            query = query.andWhere('driver_id', driver_id);
        }


        const rides = await query;

        if (rides.length === 0) {
            res.status(404).json({
                error_code: "NO_RIDES_FOUND",
                error_description: "Nenhuma viagem encontrada",
            });
            return
        }

        const formattedRides = rides.map(ride => ({
            id: ride.id,
            date: ride.created_at,
            origin: ride.origin,
            destination: ride.destination,
            distance: ride.distance,
            duration: ride.duration,
            driver: {
                id: ride.driver_id,
                name: ride.driver_name,
            },
            value: ride.value,
        }));

        res.status(200).json({
            customer_id,
            rides: formattedRides,
        });
    } catch (error) {
        next(error); 
    }
};