import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

//Configurando .env
dotenv.config();

//Importando base de datos
import { dbConnection } from './database/config.js';

//Importando Rutas
import { authRouter, eventRouter } from './routes/index.js';

//Crear servidor
const app = express();

//Conectando DB
dbConnection();

//Habilitando CORS
app.use(cors());

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', authRouter);
app.use('/api/events', eventRouter);

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

//Escuchar puerto
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})