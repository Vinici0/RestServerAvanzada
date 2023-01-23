const { response, request } = require("express");
const Cliente = require("../models/cliente");


const getAllClientes = async (req = request, res = response) => {
  const query = { estado: false};

  const [total, clientes] = await Promise.all([
    Cliente.countDocuments(query),
    Cliente.find(query).skip(),
  ]);

  res.json({
    total,
    clientes,
  });
};

const getClienteById = async (req = request, res = response) => {
  console.log("Ingrso de id");
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

const getClienteByCedula = async (req = request, res = response) => {
  console.log("adadandabwuidbaiuwbduiawbdui");
  const {cedula} = req.params;

  try {
    const cliente = await Cliente.findOne({ cedula });
    res.json(cliente);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};


const createCliente = async (req = request, res = response) => {
  console.log(req.body);
  const { cedula, correo, edad, curso, ciudad, descripcion, foto } = req.body;

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
    foto,
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

const actualizarResgitro = async (req = request, res = response) => {
  try {
    console.log(req.body)
    const cliente = await Cliente.findById(req.body.id);
    await  Cliente.updateOne({_id: req.body.id}, {$set: {estadoRegistro: !cliente .estadoRegistro}});
    res.send({message: 'Estado cambiado'});
  } catch (error) {
    console.log("mala suerte");
    res.status(500).send(error);
  }
}


const estadoAprobado = async (req = request, res = response) => {
  try {
    console.log(req.body)
    const cliente = await Cliente.findById(req.body.id);
    await  Cliente.updateOne({_id: req.body.id}, {$set: {estadoAprobado: !cliente .estadoAprobado}});
    res.send({message: 'Estado cambiado'});
  } catch (error) {
    console.log("mala suerte");
    res.status(500).send(error);
  }
}

const actualizarFotoBase64 = async (req, res) => {
  try {
    // Buscar el cliente por su ID
    // console.log(rea.body);
    console.log("id", req.params.id);
    const cliente = await Cliente.findById(req.params.id);

    console.log(req.body);

    // Verificar si el cliente existe
    if (!cliente) {
      return res.status(404).send({ error: "Cliente no encontrado" });
    }

    // Actualizar la foto del cliente
    cliente.foto = req.body.foto;
console.log("foto", req.body.foto);
    await cliente.save();

    // Enviar una respuesta de éxito
    res.status(200).send({ message: "Foto actualizada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error al actualizar la foto" });
  }
};


module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  actualizarResgitro,
  estadoAprobado,
  getClienteByCedula,
  actualizarFotoBase64
};
