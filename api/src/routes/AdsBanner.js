const { Router } = require('express');
const {
  getAdsBanners,
  getAdsBannerById,
  createAdsBanner,
  updateAdsBanner,
  deleteAdsBanner
} = require('../controllers/AdsBanner');

const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');

const router = Router();

// 👑 Solo roles 1,2,3 pueden modificar banners
router.get('/', getAdsBanners); // cualquier usuario logueado puede ver
router.get('/:id', getAdsBannerById); // cualquier usuario logueado puede ver

// 🔐 Todas requieren login
router.use(verifyJWT);

router.post('/', checkRole([1,2,3]), createAdsBanner);
router.put('/:id', checkRole([1,2,3]), updateAdsBanner);
router.delete('/:id', checkRole([1,2,3]), deleteAdsBanner);

module.exports = router;