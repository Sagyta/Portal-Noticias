const { Router } = require('express');
const {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} = require('../controllers/News');

const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');

const router = Router();

// 🔹 Rutas públicas
router.get('/', getNews);
router.get('/:id', getNewsById);

// 🔐 Rutas protegidas: solo Admin (1) y Editor (2)
router.use(verifyJWT);

router.post('/', checkRole([1,2]), createNews);
router.put('/:id', checkRole([1,2]), updateNews);
router.delete('/:id', checkRole([1,2]), deleteNews);

module.exports = router;