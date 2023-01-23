
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) =>  {
	try {
        //Comprobamos si exite una cabecera de autorizacion
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
        //Comprobamos si el token es valido
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}
        //Comprobamos si el token es valido
		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
        // Se agrega el id del usuario al objeto request
		req.userId = payload._id;
		next();
	} catch(e) {
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = verifyToken;