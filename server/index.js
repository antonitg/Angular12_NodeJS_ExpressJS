const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");
const morgan = require('morgan')
const productRouting = require('./routes/productRoutes');
const userRouting = require('./routes/userRoutes');
const barRouting = require('./routes/barRoutes');
const client = require('prom-client');

  
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const counterHomeEndpoint = new client.Counter({
    name: 'counterHomeEndpoint',
    help: 'The total number of processed requests'
});


const app = express();
conectarDB();

//app.set ('port', process.env.PORT || 4000)
const port = process.env.PORT || 4000

app.disable('etag');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', function(req, res) {
    counterHomeEndpoint.inc();
    res.json({ msg: "API REST APPBAR" });
});
app.get('/metrics', (req, res) => {
   res.set('Content-Type', client.register.contentType);
   res.end(client.register.metrics());
});
app.use('/api/products', productRouting);
app.use('/api/user', userRouting);
app.use('/api/bar', barRouting);

app.listen(port, '0.0.0.0', () => { //app.get('port')
    console.log(`El servidor está corriendo perfectamente en el puerto https://localhost:${port}`)
})
