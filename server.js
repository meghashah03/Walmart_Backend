// make folder routes,controllers,models,utils,middlewares,config,index.jsz



const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const fs = require('fs');

const productRoutes = require('./routes/productRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const errorHandler = require('./middlewares/errorHandler');


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));



// Routes
app.use('/products', productRoutes);
app.use('/warehouses', warehouseRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/orders', orderRoutes);
app.use('/deliveries', deliveryRoutes);


//middlewares
app.use(errorHandler);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


