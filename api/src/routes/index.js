const {Router} = require('express');

const roleRoute = require('./Roles');
const authorRoute = require('./Authors');
const userRoute = require('./User');
const loginRoute= require('./Login');
const categoryRoute = require('./Category')
const commentRoute = require('./Comment')
const newRoute = require('./News')
const adsLatRoute = require('./AdsLateral')
const adsBanRouter = require('./AdsBanner')

const router = Router();

// Ruta para roles
router.use('/role', roleRoute)
//Ruta para autor
router.use('/author', authorRoute)
// Ruta para user
router.use('/user', userRoute)
//Ruta para login
router.use('/login', loginRoute)
//Ruta para categorias
router.use('/category', categoryRoute)
//Ruta para comentarios
router.use('/comment', commentRoute)
//Ruta para noticias
router.use('/new', newRoute)
//Ruta para publicidad lateral
router.use('/adslateral', adsLatRoute)
//Ruta para publicidad lateral
router.use('/adsbanner', adsBanRouter)

module.exports = router;