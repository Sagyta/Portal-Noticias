const { Adslateral } = require('../db');

// 🔹 GET todos los ads laterales
const getAdsLateral = async (req, res, next) => {
  try {
    const ads = await Adslateral.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'image', 'name', 'link', 'createdAt', 'updatedAt']
    });
    res.status(200).json(ads);
  } catch (error) {
    next(error);
  }
};

// 🔹 GET ad lateral por ID
const getAdLateralById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const ad = await Adslateral.findByPk(id, {
        attributes: ['id', 'image', 'name', 'link', 'createdAt', 'updatedAt']
      });
  
      if (!ad) {
        return res.status(404).json({ error: "Anuncio no encontrado" });
      }
  
      res.status(200).json(ad);
    } catch (error) {
      next(error);
    }
  };

// 🔹 POST crear ad lateral (roles 1,2,3)
const createAdLateral = async (req, res, next) => {
  try {
    const userRole = req.user && req.user.roleId;

    if (![1, 2, 3].includes(userRole)) {
      return res.status(403).json({ error: "No tienes permisos para crear un anuncio" });
    }

    const { image, name, link } = req.body;

    if (!image || !name) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const newAd = await Adslateral.create({ image, name, link });

    res.status(201).json(newAd);
  } catch (error) {
    next(error);
  }
};

// 🔹 PUT actualizar ad lateral (roles 1,2,3)
const updateAdLateral = async (req, res, next) => {
  try {
    const userRole = req.user && req.user.roleId;

    if (![1, 2, 3].includes(userRole)) {
      return res.status(403).json({ error: "No tienes permisos para actualizar un anuncio" });
    }

    const { id } = req.params;
    const { image, name, link } = req.body;

    const ad = await Adslateral.findByPk(id);
    if (!ad) {
      return res.status(404).json({ error: "Anuncio no encontrado" });
    }

    await ad.update({ image, name, link });

    res.status(200).json(ad);
  } catch (error) {
    next(error);
  }
};

// 🔹 DELETE ad lateral (roles 1,2,3)
const deleteAdLateral = async (req, res, next) => {
  try {
    const userRole = req.user && req.user.roleId;

    if (![1, 2, 3].includes(userRole)) {
      return res.status(403).json({ error: "No tienes permisos para eliminar un anuncio" });
    }

    const { id } = req.params;
    const ad = await Adslateral.findByPk(id);

    if (!ad) {
      return res.status(404).json({ error: "Anuncio no encontrado" });
    }

    await ad.destroy();

    res.status(200).json({ message: "Anuncio eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdsLateral,
  getAdLateralById,
  createAdLateral,
  updateAdLateral,
  deleteAdLateral
};