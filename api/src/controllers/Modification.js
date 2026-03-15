const { Modification, New, User } = require("../db");

// 🔹 Crear notificación correctamente
const createModification = async (req, res, next) => {
  try {
    const { newId, userId, receiverId, action } = req.body;

    if (!newId || !userId || !receiverId || !action) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const modification = await Modification.create({
      newId: newId,    // relación con noticia
      userId,          // quien hace la acción
      receiverId,      // creador de la noticia
      action,
      read: false      // por defecto
    });

    res.status(201).json(modification);
  } catch (error) {
    next(error);
  }
};

// 🔹 Traer todas las notificaciones
const getModifications = async (req, res, next) => {
    try {
      const modifications = await Modification.findAll({
        include: [
          { model: User, attributes: ["id", "username"] }, // quien hizo la acción
          { model: User, attributes: ["id", "username"], foreignKey: "receiverId" }, // receptor
          { model: New, attributes: ["id", "title"] } // noticia
        ],
        order: [["createdAt", "DESC"]]
      });
  
      res.status(200).json(modifications);
    } catch (error) {
      next(error);
    }
  };

  const markAsRead = async (req, res, next) => {
    try {
      const { id } = req.params; // id de la notificación
  
      const modification = await Modification.findByPk(id);
      if (!modification) return res.status(404).json({ message: "Notificación no encontrada" });
  
      modification.read = true;
      await modification.save();
  
      res.status(200).json(modification);
    } catch (error) {
      next(error);
    }
  };

// 🔹 Eliminar todas las notificaciones de un usuario
const deleteUserModifications = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deleted = await Modification.destroy({
      where: { receiverId: userId },
    });

    if (!deleted) return res.status(404).json({ message: "No se encontraron notificaciones para eliminar" });

    res.status(200).json({ message: "Historial eliminado" });
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  createModification, 
  getModifications, 
  markAsRead, 
  deleteUserModifications };