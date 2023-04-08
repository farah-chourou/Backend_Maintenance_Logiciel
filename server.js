const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./database/connectionDB");
const AllRoutes = require("./Routes/AllRoutes.routes");
const InformaticienModel = require("./models/Informaticien.model");
const bcrypt = require("bcrypt");

const corstAllowAll = {
  credentials: true,
  origin: true,
  "Access-Control-Allow-Origin": "*",
};
app.use(cors(corstAllowAll));
app.options("*", cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.listen(process.env.PORT || 8081, () => {
  connectDB();
});

/********** ROUTES  */

app.use("/", AllRoutes);

/***** create chefProjet */

async function createChefProjet() {
  try {
    const existingUser = await InformaticienModel.findOne({
      role: "CHEF_PROJET",
    });

    if (!existingUser) {
      const mdp = "12345678";
      const mdpCrypted = await bcrypt.hash(mdp, Number(process.env.SALT));
      const newUser = new InformaticienModel({
        mail: "arij@gmail.com",
        nom: "Arij",
        prenom: "Dadi",
        role: "CHEF_PROJET",
        spec: "FrontEnd Developer",
        mdp: mdpCrypted,
        tel: 2222222,
      });

      await newUser.save();
      console.log("New chefProjet user created");
    }
  } catch (error) {
    console.error(error);
  }
}

createChefProjet();
