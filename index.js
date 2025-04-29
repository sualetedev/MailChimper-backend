const { connection } = require('./database/connection');
const express = require('express');
const cors = require('cors');


const UserRoutes = require('./routes/user');
const AudienceRoutes = require('./routes/audience');
const CampaignRoutes = require('./routes/campaign');


connection();

console.log('Conectado a la base de datos');


const app = express();
const port = 3900;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

//Rutas

app.get('/probando', (req, res) => {
    res.status(200).send({message: 'Probando la ruta'});
})


app.use('/api/user', UserRoutes)
app.use('/api/audience', AudienceRoutes)
app.use('/api/campaign', CampaignRoutes)


app.listen(port,() => {
    console.log('Servidor corriendo en el puerto', port);
})