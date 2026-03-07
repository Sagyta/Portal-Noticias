const { Router } = require('express');
const {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
} = require('../controllers/Roles');

const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');

const router = Router();

// 🔐 Todas requieren login
router.use(verifyJWT);

// 👑 Solo Admin puede todo
router.get('/', checkRole([1]), getRoles);
router.get('/:id', checkRole([1]), getRoleById);
router.post('/', checkRole([1]), createRole);
router.put('/:id', checkRole([1]), updateRole);
router.delete('/:id', checkRole([1]), deleteRole);

module.exports = router;