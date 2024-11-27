import { Request, Response, NextFunction } from 'express';
import { knex } from '../db/conexao'; 


export const confirmRide = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { customer_id, origin, destination, distance, duration, driver, value } = req.body;


    if (!customer_id || !origin || !destination || !driver || distance === undefined || !value) {
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
        return
    }

    const selectedDriver = await knex('drivers')
        .where('id', driver.id)
        .first();

    if (!selectedDriver) {
        res.status(404).json({
            error_code: "DRIVER_NOT_FOUND",
            error_description: "Motorista não encontrado",
        });
        return
    }


    if (distance < selectedDriver.minKm) {
        res.status(406).json({
            error_code: "INVALID_DISTANCE",
            error_description: "Quilometragem inválida para o motorista",
        });
        return
    }

    try {
        
        const [newRide] = await knex('rides')
            .insert({
                customer_id,
                origin,
                destination,
                distance,
                duration,
                driver_id: driver.id,
                value,
            })
            .returning('*'); 

            const formattedRide = {
                ...newRide,
                driver: {
                    id: selectedDriver.id,
                    name: selectedDriver.name, // Adiciona o nome do motorista
                },
            };
    
            res.status(200).json({
                success: true,
                data: formattedRide,
            });
            
    } catch (error) {
        console.error('Erro ao inserir a viagem:', error);
        next(error);
    }
};