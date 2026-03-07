const { Router } = require('express');
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/Category');

const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');

const router = Router();

// 🌎 Públicas
router.get('/', getCategories);
router.get('/:id', getCategoryById);

// 🔐 Privadas (requieren login + admin)
router.post('/', verifyJWT, checkRole([1]), createCategory);
router.put('/:id', verifyJWT, checkRole([1]), updateCategory);
router.delete('/:id', verifyJWT, checkRole([1]), deleteCategory);

module.exports = router;