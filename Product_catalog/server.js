const express = require('express');
const connection = require('./connection/connection')
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./router/router');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});