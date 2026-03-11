const { User, Role, Author } = require('../db');
const crypto = require('crypto');
const bcrypt = require('bcrypt')

// 🔹 Generador de contraseña segura
const generatePassword = () => {
  return crypto.randomBytes(6).toString('base64'); 
};

// =======================
// CREAR USUARIO
// =======================

const createUser = async (req, res, next) => {
  try {
    const { username, email, roleId, authorId } = req.body;

    if (!username || !email || !roleId || !authorId) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    // Verificar email único
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Verificar username único
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: 'El username ya está en uso' });
    }

    // Generar password
    const generatedPassword = generatePassword();

    const newUser = await User.create({
      username,
      email,
      password: generatedPassword,
      roleId,
      authorId
    });

    // Excluir password de la respuesta
    const userResponse = await User.findByPk(newUser.id, {
      attributes: { exclude: ['password'] },
      include: [Role, Author]
    });

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user: userResponse,
      temporaryPassword: generatedPassword
    });

  } catch (error) {
    next(error);
  }
};

// =======================
// OBTENER USUARIOS
// =======================

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{
        model: Role,
        attributes: ['name']
      },
      {
        model: Author,
        attributes: ['displayName']
      }]
    });

    res.status(200).json(users);

  } catch (error) {
    next(error);
  }
};

// =======================
// OBTENER USUARIOS xID
// =======================

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      include: [Role, Author]
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// =======================
// EDITAR USUARIOS
// =======================

const updateUser = async (req, res, next) => {
  console.log("BODY EN UPDATE:", req.body);
  const { id } = req.params;
  const { username, password, roleId, authorId } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const loggedUser = req.user; // viene del token

    const isAdmin = loggedUser.roleId === 1;
    const isOwner = loggedUser.id === id;

    // 🔒 Si NO es admin y NO es dueño → prohibido
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: 'No tienes permisos para editar este usuario' });
    }

    // ✏️ Username lo puede cambiar admin o dueño
    if (username) {
      user.username = username;
    }

    // 🔐 Password lo puede cambiar admin o dueño
    if (password) {
      //const hashedPassword = await bcrypt.hash(password, 10);
      user.password = password;
    }

    // 🟢 SOLO ADMIN puede cambiar rol y author
    if (isAdmin) {
      if (roleId !== undefined) user.roleId = roleId;
      if (authorId !== undefined) user.authorId = authorId;
    }

    await user.save();

    res.status(200).json({
      message: 'Usuario actualizado correctamente'
    });

  } catch (error) {
    next(error);
  }
};

// =======================
// BORRAR USUARIOS
// =======================

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await user.destroy();

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

// =======================
// RESET PASSWORD USUARIO
// =======================

const resetUserPassword = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const loggedUser = req.user; // viene del token
    const isAdmin = loggedUser.roleId === 1;

    // 🔒 Solo admin puede resetear password
    if (!isAdmin) {
      return res.status(403).json({ error: 'No tienes permisos para resetear la contraseña' });
    }

    // 🔹 Generar nuevo password temporal
    const newPassword = generatePassword();

    // 🔐 Guardarlo en la base (aquí si usas bcrypt lo puedes hashear)
    user.password = newPassword; // O bcrypt.hash(newPassword, 10) si quieres hashear
    await user.save();

    res.status(200).json({
      message: 'Contraseña reseteada correctamente',
      temporaryPassword: newPassword
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  resetUserPassword
};