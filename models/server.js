const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.js");

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.path = {
      usuarioPath: "/api/usuarios",
      loginPath: "/api/login",
      cursoPath: "/api/cursos",
      uploadPath: "/api/uploads",
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
    this.app.use(this.path.usuarioPath, require("../routes/usuarios.js"));
    this.app.use(this.path.loginPath, require("../routes/auth.js"));
    this.app.use(this.path.cursoPath, require("../routes/cursos.js"));
    this.app.use(this.path.uploadPath, require("../routes/uploads.js"));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${process.env.PORT}!`);
    });
  }
}

module.exports = Server;
