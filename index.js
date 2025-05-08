const { connection } = require("./database/connection");
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const UserRoutes = require("./routes/user");
const AudienceRoutes = require("./routes/audience");
const CampaignRoutes = require("./routes/campaign");
const ContactRoutes = require("./routes/contact");
const TemplateRoutes = require("./routes/template");
const SendRoutes = require("./routes/send")

//Instanciamos swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API-MailChimper",
      version: "1.0.0",
      description: "API de MailChimper",
    },
    servers: [
      {
        url: "http://localhost:3900/api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

connection();

console.log("Conectado a la base de datos");

const app = express();
const port = 3900;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//Rutas

app.get("/probando", (req, res) => {
  res.status(200).send({ message: "Probando la ruta" });
});

app.use("/api/user", UserRoutes);
app.use("/api/audience", AudienceRoutes);
app.use("/api/campaign", CampaignRoutes);
app.use("/api/contact", ContactRoutes);
app.use("/api/templates", TemplateRoutes);
app.use("/api/send", SendRoutes);

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto", port);
});
