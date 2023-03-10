const { Router } = require("express");
const { check } = require("express-validator");

const { crearUsuario, getUsuarios, actualizarUsuario, borrarUsuario } = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, varlidarADMIN_ROLE_o_MismoUsuario, varlidarADMIN_ROLE } = require("../middlewares/validar-jwt");
const router = Router();


router.get( '/', validarJWT , getUsuarios );

router.post( '/',
  [
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('password', 'El password es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio').isEmail(),
      validarCampos,
  ],
  crearUsuario
);

router.put( '/:id',
  [
      validarJWT,
      varlidarADMIN_ROLE_o_MismoUsuario,
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio').isEmail(),
      check('role', 'El role es obligatorio').not().isEmpty(),
      validarCampos,
  ],
  actualizarUsuario
);

router.delete( '/:id',
  [ validarJWT, varlidarADMIN_ROLE ],
  borrarUsuario
);


module.exports = router;
