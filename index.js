const express = require("express");
const axios = require("axios");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// * Middleware
app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = '';



app.get("/", async (req, res) => {
  
});

app.get("/update-cobj", async (req, res) => {
  
});

app.post('/update-cobj', async (req, res) => {

});


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));