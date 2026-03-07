const { Router } = require('express');
const { createUser, getUsers, getUserById, updateUser,deleteUser } = require('../controllers/User');
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');

const router = Router();

// 🔐 Todas las rutas requieren login
router.use(verifyJWT);

// 👑 Admin crea usuarios
router.post('/', checkRole([1]), createUser);

// 👑 Admin ve todos
router.get('/', checkRole([1]), getUsers);

// 👑 Admin puede ver cualquiera
// 👤 Editor/Moderador solo su propio perfil (lo controla el controller)
router.get('/:id', getUserById);

// 👑 Admin edita cualquiera
// 👤 Editor/Moderador solo su propio perfil
router.put('/:id', updateUser);

// 👑 Solo Admin elimina
router.delete('/:id', checkRole([1]), deleteUser);

module.exports = router;