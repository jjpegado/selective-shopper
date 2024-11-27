import 'dotenv/config'
import express from 'express'
import rotas from './rotas'
import cors from 'cors';

const app = express()

app.use(express.json())
app.use(cors());
app.use(rotas)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Servidor inicializado na porta ${PORT}`);
})