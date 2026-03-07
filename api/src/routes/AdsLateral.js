const { Router } = require('express');
const {
  getAdsLateral,
  getAdLateralById,
  createAdLateral,
  updateAdLateral,
  deleteAdLateral
} = require('../controllers/Adslateral');

const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');

const router = Router();

// 🔹 GET público: cualquiera puede ver los ads laterales
router.get('/', getAdsLateral);
router.get('/:id', getAdLateralById);

// 🔐 Todas las demás requieren login
router.use(verifyJWT);

// 👑 Solo roles 1,2,3 pueden crear, editar y borrar
router.post('/', checkRole([1, 2, 3]), createAdLateral);
router.put('/:id', checkRole([1, 2, 3]), updateAdLateral);
router.delete('/:id', checkRole([1, 2, 3]), deleteAdLateral);

module.exports = router;