const { response } = require("express");
const Curso = require("../models/curso");

const getCursos = async (req, res) => {

  const { limite = 5, desde = 0 } = req.query;
  const query =  { estado: true };
  const cursoAprobado = { cursoAprobado: true}
  const sinAprobado = { cursoAprobado: false}

  const [Totaldisponibles,totalAproado, totalSinAprobar ,cursos] = await Promise.all([
    Curso.countDocuments(query),
    Curso.countDocuments(cursoAprobado),
    Curso.countDocuments(sinAprobado),
    Curso.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    ok: true,
    cursos,
    Totaldisponibles,
    totalAproado,
    totalSinAprobar
  })

};

const getCursosAddCarrito = async (req = request, res = response) => {
  const query = { ingresarCarrito: true };
  const {id} = req.params;

  try {
    const curso = await   Curso.find(query).where('usuario').equals(id);
    res.json({
      ok: true,
      curso,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
}

const crearCurso = async (req, res = response) => {
  //    nombre, descripcion, precio, img, usuario,
  const { nombre, descripcion, precio, img, usuario } = req.body;

  try {
    const exiteNombreCurso = await Curso.findOne({ nombre });
    if (exiteNombreCurso) {
      return res.status(400).json({
        ok: false,
        msg: "El curso ya está registrado",
      });
    }

    const data = {
      nombre,
      descripcion,
      precio,
      img,
      usuario,
    };

    const curso = new Curso(data);

    await curso.save();

    res.json({
      ok: true,
      curso,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};



const putCursosAddCarrito = async (req, res) => {
  const { id } = req.params;

  try {
    const curso = await Curso.findById(id);
    curso.ingresarCarrito = !curso.ingresarCarrito;
    await curso.save();
    res.json({
      ok: true,
      curso,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const putCompraCarrito = async (req, res) => {
  const { id } = req.params;

  try {
    const curso = await Curso.findById(id);
    curso.compraCarrito = !curso.compraCarrito;
    await curso.save();
    res.json({
      ok: true,
      curso,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const putCursoAprobado = async (req, res) => {
  const { id } = req.params;

  try {
    const curso = await Curso.findById(id);
    curso.cursoAprobado = !curso.cursoAprobado;
    await curso.save();
    res.json({
      ok: true,
      curso,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};






module.exports = {
  getCursos,
  getCursosAddCarrito,
  crearCurso,
  putCursosAddCarrito,
  putCompraCarrito,
  putCursoAprobado,
}
