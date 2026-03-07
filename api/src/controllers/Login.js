const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Role, Author } = require('../db');
require('dotenv').config();

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // 1️⃣ Buscar el usuario y traer rol y autor
    const user = await User.findOne({
      where: { username },
      include: [
        { model: Role},
        { model: Author}
      ]
    });
    
    /*const roleName = user.Role ? user.Role.name : null;
    const authorName = user.Author ? user.Author.displayName : null;*/

    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    // 2️⃣ Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("PASSWORD INGRESADO:", password);
console.log("HASH EN BD:", user.password);
console.log("RESULTADO COMPARE:", isPasswordValid);

    if (!isPasswordValid) return res.status(400).json({ error: 'Contraseña incorrecta' });

    

    // 3️⃣ Verificar que el usuario tenga rol de admin
  /*  if (!user.roleId || user.roleId !== 1) {
      return res.status(403).json({ error: 'No autorizado' });
    }*/

    // 4️⃣ Crear token JWT
    const payload = {
      id: user.id,
      username: user.username,
      roleId: user.roleId,
      authorId: user.authorId
    };
   // console.log("PAYLOAD ANTES DE FIRMAR en login:", payload);
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // 5️⃣ Devolver usuario + token
    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roleId: user.roleId,
        roleName: user.role ? user.role.name : null,
        authorId: user.authorId,
        authorName: user.author ? user.author.displayName : null
      },
      token
    });
  } catch (err) {
    next(err); // se pasa al middleware de errores
  }
};

module.exports = { login };