const Usuario = require("../models/usuario");
const Curso = require("../models/curso");

const fs = require("fs");

const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    // borrar la imagen anterior
    fs.unlinkSync(path);
  }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo = "";
  switch (tipo) {
    case "cursos":
      const curso = await Curso.findById(id);
      if (!curso) {
        console.log("No es un curso por id");
        return false;
      }

      pathViejo = `./uploads/cursos/${curso.img}`;
      borrarImagen(pathViejo);

      curso.img = nombreArchivo;
      await curso.save();
      return true;

      break;

    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log("No es un usuario por id");
        return false;
      }

      pathViejo = `./uploads/usuarios/${usuario.img}`;
      borrarImagen(pathViejo);

      usuario.img = nombreArchivo;
      await usuario.save();
      return true;
      break;
  }
};

module.exports = {
  actualizarImagen,
};
