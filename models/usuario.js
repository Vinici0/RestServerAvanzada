const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema(
  {
    email: String,
    password: String,
  },
  {
    timestamp: true,
  }
);
module.exports = model("User", UsuarioSchema, "users");
