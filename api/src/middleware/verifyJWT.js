const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  // 1️⃣ Leer el token desde los headers de la solicitud
  let token = null;

if (req.headers.authorization) {
  token = req.headers.authorization.split(' ')[1];
}
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // 2️⃣ Verificar el token usando JWT_SECRET
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }

    // 3️⃣ Si el token es válido, almacenamos los datos del usuario en req.user
    req.user = decoded; // Datos decodificados del token (como el id, username, role, etc.)

    // 4️⃣ Llamamos a next() para pasar al siguiente middleware o ruta
    next();
  });
};

module.exports = verifyJWT;