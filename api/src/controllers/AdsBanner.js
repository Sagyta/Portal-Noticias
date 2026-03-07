const { Adsbanner } = require('../db');

// 🔹 GET todos los banners
const getAdsBanners = async (req, res, next) => {
  try {
    const banners = await Adsbanner.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(banners);
  } catch (error) {
    next(error);
  }
};

// 🔹 GET banner por ID
const getAdsBannerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const banner = await Adsbanner.findByPk(id);

    if (!banner) return res.status(404).json({ error: "Banner no encontrado" });

    res.status(200).json(banner);
  } catch (error) {
    next(error);
  }
};

// 🔹 POST crear banner (solo roles 1,2,3)
const createAdsBanner = async (req, res, next) => {
  try {
    const { name, image, link } = req.body;

    if (!name || !image) {
      return res.status(400).json({ error: "Nombre e imagen son obligatorios" });
    }

    const newBanner = await Adsbanner.create({
      name,
      image,
      link: link || ''
    });

    res.status(201).json(newBanner);
  } catch (error) {
    next(error);
  }
};

// 🔹 PUT actualizar banner (solo roles 1,2,3)
const updateAdsBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, image, link } = req.body;

    const banner = await Adsbanner.findByPk(id);
    if (!banner) return res.status(404).json({ error: "Banner no encontrado" });

    await banner.update({
      name: name || banner.name,
      image: image || banner.image,
      link: link !== undefined ? link : banner.link
    });

    res.status(200).json(banner);
  } catch (error) {
    next(error);
  }
};

// 🔹 DELETE banner (solo roles 1,2,3)
const deleteAdsBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const banner = await Adsbanner.findByPk(id);

    if (!banner) return res.status(404).json({ error: "Banner no encontrado" });

    await banner.destroy();
    res.status(200).json({ message: "Banner eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdsBanners,
  getAdsBannerById,
  createAdsBanner,
  updateAdsBanner,
  deleteAdsBanner
};