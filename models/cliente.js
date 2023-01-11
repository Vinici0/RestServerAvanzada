const {Schema, model} = require('mongoose');

const ClienteSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
    },
    cedula: {
        type: String,
        required: [true, 'La cedula es obligatoria'],
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    edad : {
        type: Number,
        required: [true, 'La edad es obligatoria'],
    },
    curso: {
        type: String,
        required: [true, 'El curso es obligatorio'],
    },
    ciudad : {
        type: String,
        required: [true, 'La ciudad es obligatoria'],
    },
    descripcion: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: false,
    },
});

//Se elimina la contraseña del objeto que se retorna al cliente
ClienteSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
};


module.exports = model("Cliente", ClienteSchema);