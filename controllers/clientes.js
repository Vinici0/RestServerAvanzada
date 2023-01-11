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
  res.json({
    msg: "get API - controlador",
  });
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
  res.json({
    msg: "put API - controlador",
  });
};

const deleteCliente = async (req = request, res = response) => {
  res.json({
    msg: "delete API - controlador",
  });
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};
