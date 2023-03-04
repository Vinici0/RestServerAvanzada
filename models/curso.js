const { Schema, model } = require("mongoose");

const CursoSchema = Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    descripcion: {
      type: String,
      required: [true, "La descripcion es obligatorio"],
    },
    estado: {
      type: Boolean,
      default: true,
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
    },
    ingresarCarrito: {
      type: Boolean,
      default: false,
    },

    compraCarrito: {
      type: Boolean,
      default: false,
    },

    cursoAprobado: {
      type: Boolean,
      default: false,
    },

    usuario:{
      required: false,
      type: Schema.Types.ObjectId,
      ref: 'Usuario'
    },

    img: {
      type: String,
    },
  },
  { collection: "cursos" }
);

CursoSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Curso", CursoSchema);
