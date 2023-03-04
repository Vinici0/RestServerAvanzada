const { Router } = require("express");
const { check } = require("express-validator");

const {
  getCursos,
  getCursosAddCarrito,
  crearCurso,
  putCursosAddCarrito,
  putCompraCarrito,
  putCursoAprobado,
} = require("../controllers/cursos");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getCursos);

router.get("/:id", validarJWT, getCursosAddCarrito);

router.post("/", validarJWT, crearCurso);

router.put("/:id/cursosAddCarrito", validarJWT, putCursosAddCarrito);

router.put("/:id/compraCarrito", validarJWT, putCompraCarrito);

router.put("/:id/cursoAprobado", validarJWT, putCursoAprobado);

module.exports = router;
