const { response, request } = require("express");
const jwt = require('jsonwebtoken');

const Usuario = require("../models/usuario");

const signin = async (req = request, res = response) => {

    const { email, password } = req.body;
    
    try { 
        const user = await Usuario.findOne({email});
        if(!user) return res.status(401).send('The email doen\' exists');
        if(user.password !== password) return res.status(401).send('The password is invalid');
        const token = jwt.sign({_id: user._id}, 'secretkey'); //secretkey-> Sirve para firmar el token y que no sea facilmente decodificado
        return res.status(200).json({token});//Devuelve el token al cliente 
    } catch (error) {
        console.log(error);
    }
}

exports.signin = signin;
