const { Router } = require("express");
const { check } = require("express-validator");
const { getAllClientes, getClienteById, createCliente, updateCliente, deleteCliente } = require("../controllers/clientes.js");

const router = Router();

router.get("/", getAllClientes);

router.get("/:id", getClienteById);

router.post("/", createCliente);

router.put("/:id", updateCliente);

router.delete("/:id", deleteCliente);

module.exports = router;