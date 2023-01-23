const { Router } = require("express");
const { check } = require("express-validator");
const { getAllClientes, getClienteById, createCliente, updateCliente, deleteCliente, actualizarResgitro, estadoAprobado, getClienteByCedula, actulizarFotoBase64, actualizarFotoBase64 } = require("../controllers/clientes.js");
const verifyToken = require("../helpers/verifyToken.js");

const router = Router();

router.get("/", getAllClientes);

router.get("/:id", getClienteById);

router.get("/cedula/:cedula", getClienteByCedula);

router.post("/", createCliente);

router.put("/:id", updateCliente);

router.delete("/:id", deleteCliente);

router.patch("/estado",actualizarResgitro);

router.patch("/estado2",estadoAprobado);

//actulizarFotoBase64

router.put("/foto/:id",actualizarFotoBase64);

module.exports = router;