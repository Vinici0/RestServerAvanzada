const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {signin} = require("../controllers/usuarios.js");

router.post("/" ,signin);

module.exports = router;