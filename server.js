// make folder routes,controllers,models,utils,middlewares,config,index.jsz
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const fs = require('fs');
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


/*app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/contact", (req, res) => {
  res.send("Contact page");
});

app.get("/services", (req, res) => {
  res.send("Services page");
});

app.get("/products", (req, res) => {
  res.send("Products page");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });*/