const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.js");

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.path = {
      clientePath: "/api/clientes",
      usuarioPath: "/api/usuarios",
    };

    //Conectar a base de datos
    this.ConectorDB();
    
    this.middleware();
    // Middlewares

    this.router();
  }

  async ConectorDB() {
    await dbConnection();
  }

  middleware() {
    
    this.app.use(cors());

    this.app.use(express.json());
  }

  router() {
    this.app.use(this.path.clientePath, require("../routes/clientes.js"));
    this.app.use(this.path.usuarioPath, require("../routes/usuarios.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${process.env.PORT}!`);
    });
  }
}

module.exports = Server;
