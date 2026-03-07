const { Role } = require('../db');

// GET ALL
const getRoles = async (req, res, next) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

// GET BY ID
const getRoleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);

    if (!role) {
      const error = new Error('Role no encontrado');
      error.status = 404;
      throw error;
    }

    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

// CREATE
const createRole = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      const error = new Error('Faltan datos obligatorios');
      error.status = 400;
      throw error;
    }

    const newRole = await Role.create({ name, description });

    res.status(201).json(newRole);
  } catch (error) {
    next(error);
  }
};

// UPDATE
const updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const role = await Role.findByPk(id);

    if (!role) {
      const error = new Error('Role no encontrado');
      error.status = 404;
      throw error;
    }

    await role.update({ name, description });

    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

// DELETE
const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);

    if (!role) {
      const error = new Error('Role no encontrado');
      error.status = 404;
      throw error;
    }

    await role.destroy();

    res.status(200).json({ message: 'Rol eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};