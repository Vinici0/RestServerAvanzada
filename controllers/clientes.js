const { response, request } = require("express");
const Cliente = require("../models/cliente");


const getAllClientes = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: false};

  const [total, clientes] = await Promise.all([
    Cliente.countDocuments(query),
    Cliente.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    clientes,
  });
};

const getClienteById = async (req = request, res = response) => {

  const {id} = req.params;

  try {
    const cliente = await Cliente.findById(id);
    res.json(cliente);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const createCliente = async (req = request, res = response) => {
  const { cedula, correo, edad, curso, ciudad, descripcion } = req.body;

  const nombre = req.body.nombre.toUpperCase();
  const apellido = req.body.apellido.toUpperCase();

  const data = {
    nombre,
    apellido,
    cedula,
    correo,
    edad,
    curso,
    ciudad,
    descripcion,
  };

  const cliente = new Cliente(data);

  await cliente.save();

  //Se le envio todo el objeto usuario con los capos eliminados en la base de datos
  res.status(201).json(cliente);
};

const updateCliente = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, estado, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  if (data.apellido) {
    data.apellido = data.apellido.toUpperCase();
  }

  const cliente = await Cliente. findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json(cliente);
};

const deleteCliente = async (req = request, res = response) => {
  const { id } = req.params;

  const cliente = await Cliente.findOneAndDelete(id);

  res.json(cliente);

};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};
