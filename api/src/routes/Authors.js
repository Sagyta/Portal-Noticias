const { Router } = require('express');
const {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/Authors');

const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');

const router = Router();

// 🔐 Todas requieren login
router.use(verifyJWT);

// 👑 Solo Admin puede todo
router.get('/', checkRole([1]), getAuthors);
router.get('/:id', checkRole([1]), getAuthorById);
router.post('/', checkRole([1]), createAuthor);
router.put('/:id', checkRole([1]), updateAuthor);
router.delete('/:id', checkRole([1]), deleteAuthor);

module.exports = router;