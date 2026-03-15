require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Conexión a la nueva base de datos 'portal_news'
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/portal_news`, {
  logging: false,
  native: false,
  define: { timestamps: false }
});

const basename = path.basename(__filename);
const modelDefiners = [];

// Cargar todos los modelos dentro de /models
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => modelDefiners.push(require(path.join(__dirname, '/models', file))));

modelDefiners.forEach(model => model(sequelize));

// Capitalizamos nombres de modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(([key, value]) => [key[0].toUpperCase() + key.slice(1), value]);
sequelize.models = Object.fromEntries(capsEntries);

// Traemos los modelos
const { New, Comment, User, Category, Role, Author, Modification } = sequelize.models;

// ------------------ RELACIONES ------------------ //

// Noticias y comentarios
New.hasMany(Comment);
Comment.belongsTo(New);

// Categorías y noticias
Category.hasMany(New, { foreignKey: 'categoryId' });
New.belongsTo(Category, { foreignKey: 'categoryId' });

// Usuarios y noticias
User.hasMany(New);
New.belongsTo(User);

// Usuarios y comentarios
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

// Roles y usuarios
Role.hasMany(User, { foreignKey: 'roleId'});
User.belongsTo(Role, { foreignKey: 'roleId' });

// Autores y usuarios
Author.hasMany(User, { foreignKey: 'authorId' });
User.belongsTo(Author, { foreignKey: 'authorId' });

// Noticias y autores (para mostrar en la noticia solo el displayName)
Author.hasMany(New);
New.belongsTo(Author);

//notificaciones
User.hasMany(Modification, { foreignKey: 'userId' });
Modification.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Modification, { foreignKey: 'receiverId' });
Modification.belongsTo(User, { foreignKey: 'receiverId' });

New.hasMany(Modification);
Modification.belongsTo(New);

// ------------------ TEST DE CONEXIÓN ------------------ //
sequelize.authenticate()
  .then(() => console.log('✅ Conectado a PostgreSQL: portal_news'))
  .catch(err => console.error('❌ Error en la conexión:', err));

console.log('📌 Modelos cargados:', Object.keys(sequelize.models));

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};