const { Router } = require('express');
const {
  getComment,
  postComment,
  deleteComment
} = require('../controllers/Comment');

const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');

const router = Router();

// 🌎 Público
router.get('/', getComment);              // ?newId=ID
router.post('/:newId', postComment);     // /comment/:newId

// 👑 Solo colaboradores
router.delete('/:id', verifyJWT, checkRole([1,2,3]), deleteComment);

module.exports = router;