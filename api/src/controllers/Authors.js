const { Author } = require('../db'); // ajustá si tu export es diferente

// GET ALL
const getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.findAll();
    return res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

// GET BY ID
const getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await Author.findByPk(id);

    if (!author) {
      return res.status(404).json({ message: 'Author no encontrado' });
    }

    return res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

// CREATE
const createAuthor = async (req, res, next) => {
  try {
    const { displayName } = req.body;

    if (!displayName) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const newAuthor = await Author.create({
      displayName
    });

    return res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
};

// UPDATE
const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { displayName } = req.body;

    const author = await Author.findByPk(id);

    if (!author) {
      return res.status(404).json({ message: 'Author no encontrado' });
    }

    await author.update({
      displayName
    });

    return res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

// DELETE
const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await Author.findByPk(id);

    if (!author) {
      return res.status(404).json({ message: 'Author no encontrado' });
    }

    await author.destroy();

    return res.status(200).json({ message: 'Author eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};