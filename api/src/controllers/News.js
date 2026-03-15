const { New, Category, User, Author, Comment } = require('../db');

// 🔹 GET todas las noticias
const getNews = async (req, res, next) => {
  try {
    const news = await New.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        { model: Category, attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } },
        { model: User, attributes: ['username'] },
        { model: Author, attributes: { exclude: ['id'] } },
        { model: Comment, attributes: { exclude: ['id', 'newId', 'userId'] } } // solo para contar comentarios
      ]
    });

    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

// 🔹 GET noticia por ID
const getNewsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const news = await New.findByPk(id, {
      include: [
        { model: Category, attributes: ['name'] },
        { model: User, attributes: ['username'] },
        { model: Author, attributes: ['displayName'] },
        { model: Comment, attributes: ['id', 'username', 'comment', 'createdAt'] }
      ]
    });

    if (!news) return res.status(404).json({ error: "Noticia no encontrada" });

    news.views += 1;
    await news.save();

    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

// 🔹 POST crear noticia (solo admin)
const createNews = async (req, res, next) => {
  try {
    const { title, subtitle, text, image, videoLink, categoryId, userId, authorId, status } = req.body;

    if (!title || !subtitle || !text ) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const news = await New.create({
      title,
      subtitle,
      text,
      image,
      videoLink: videoLink || '',
      categoryId: categoryId || null,
      userId: userId || null,
      authorId: authorId || null,
      status: status || 'pending' // 🔹 se guarda como pendiente
    });

    res.status(201).json(news);
  } catch (error) {
    next(error);
  }
};

// 🔹 PUT actualizar noticia (solo admin)
const updateNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, subtitle, text, image, videoLink, categoryId, userId, authorId, status } = req.body;

    const news = await New.findByPk(id);
    if (!news) return res.status(404).json({ error: "Noticia no encontrada" });

    await news.update({
      title: title || news.title,
      subtitle: subtitle || news.subtitle,
      text: text || news.text,
      image: image || news.image,
      videoLink: videoLink !== undefined ? videoLink : news.videoLink,
      categoryId: categoryId !== undefined ? categoryId : news.categoryId,
      userId: userId !== undefined ? userId : news.userId,
      authorId: authorId !== undefined ? authorId : news.authorId,
      status: status !== undefined ? status : news.status
    });

    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

// 🔹 DELETE noticia (solo admin)
const deleteNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const news = await New.findByPk(id);
    if (!news) return res.status(404).json({ error: "Noticia no encontrada" });

    await news.destroy();
    res.status(200).json({ message: "Noticia eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
};