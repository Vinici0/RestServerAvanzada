const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.js");

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.path = {
      clientePath: "/api/clientes",
    };

     //Conectar a base de datos
     this.ConectorDB();

    // Middlewares
    this.middleware();

    this.router();
  }

  async ConectorDB() {
    await dbConnection();
  }

  middleware() {
    //CORS
    this.app.use(cors());
    //lectura y parseo del body
    this.app.use(express.json());
  }

  router() {
    this.app.use(this.path.clientePath, require("../routes/clientes.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${process.env.PORT}!`);
    });
  }
}

module.exports = Server;
