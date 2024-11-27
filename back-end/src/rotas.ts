import {Router} from 'express'
import {estimateRide}  from './controllers/estimateRide';
import {confirmRide} from './controllers/confirmRide'
import {getRides} from './controllers/getRides'

const rotas = Router()

rotas.post('/ride/estimate', estimateRide);
rotas.patch('/ride/confirm', confirmRide);
rotas.get('/ride/:customer_id', getRides);


export default rotas