const { Category } = require('../db');

// 🔹 GET ALL
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// 🔹 GET BY ID
const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// 🔹 CREATE
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    const existing = await Category.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({ error: "La categoría ya existe" });
    }

    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

// 🔹 UPDATE
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    if (name) category.name = name;
    await category.save();

    res.status(200).json({ message: "Categoría actualizada correctamente" });
  } catch (error) {
    next(error);
  }
};

// 🔹 DELETE
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    await category.destroy();
    res.status(200).json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};