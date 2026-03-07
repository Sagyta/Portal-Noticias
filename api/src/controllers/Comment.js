const { Comment } = require('../db');

// 🔹 GET comentarios (por noticia)
const getComment = async (req, res, next) => {
  try {
    const { newId } = req.query;

    if (!newId) {
      return res.status(400).json({ error: "Falta newId" });
    }

    const comments = await Comment.findAll({
      where: { newId },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'comment', 'username', 'createdAt', 'newId']
    });

    res.status(200).json(comments);

  } catch (error) {
    next(error);
  }
};

// 🔹 POST comentario (público)
const postComment = async (req, res, next) => {
  try {
    const { newId } = req.params;
    const { username, comment } = req.body;

    if (!username || !comment) {
      return res.status(400).json({ error: "Nombre y comentario son obligatorios" });
    }

    const newComment = await Comment.create({
      username: username.trim(),
      comment: comment.trim(),
      newId,
      userId: null // no hay login público
    });

    res.status(201).json(newComment);

  } catch (error) {
    next(error);
  }
};

// 🔹 DELETE comentario (solo roles 1,2,3)
const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    await comment.destroy();
    res.status(200).json({ message: "Comentario eliminado correctamente" });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getComment,
  postComment,
  deleteComment
};