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

// * Routes
app.get("/", async (req, res) => {
  const url = `https://api.hubspot.com/crm/v3/objects/2-222472662?properties=makeup_item,makeup_brand,makeup_price`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
        "Content-Type": "application/json",
      },
    });

    const records = response.data.results;
    console.log("records", records);
    res.render("homepage", { records });
  } catch (error) {
    console.error("Error fetching custom object:", error.message);
    res.send("Error retrieving records");
  }
});

app.get("/update-cobj", async (req, res) => {
  res.render("updates");
});

app.post("/update-cobj", async (req, res) => {
  const { makeup_item, makeup_brand, makeup_price } = req.body;

  const data = {
    properties: {
      makeup_item: makeup_item,
      makeup_brand: makeup_brand,
      makeup_price: makeup_price,
    },
  };
  try {
    const response = await axios.post(
      "https://api.hubspot.com/crm/v3/objects/2-222472662",
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Custom Object Added:", response.data);

     res.redirect("/");
  } catch (error) {
    console.error("Error Fetching Custom objects", error);
  }
});


/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});
*/


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));