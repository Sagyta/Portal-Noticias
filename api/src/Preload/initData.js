// src/Preload/initData.js
const { Role, Author, User } = require('../db');
const bcrypt = require('bcrypt');

async function initData() {
  try {
    // ========================
    // 1️⃣ Crear roles fijos
    // ========================
    const rolesData = [
      { id: 1, name: 'Administrador', description: 'Rol con todos los permisos' },
      { id: 2, name: 'Editor', description: 'Puede crear, editar y borrar noticias, categorias y comentarios' },
      { id: 3, name: 'Moderador', description: 'Puede borrar comentarios de noticias' }
    ];

    for (const role of rolesData) {
      await Role.findOrCreate({
        where: { id: role.id },
        defaults: { name: role.name, description: role.description }
      });
    }

    // ========================
    // 2️⃣ Crear autores fijos
    // ========================
    const authorsData = [
      { id: 1, displayName: 'Redaccion' },
      { id: 2, displayName: 'Moderacion' }
    ];

    for (const author of authorsData) {
      await Author.findOrCreate({
        where: { id: author.id },
        defaults: { displayName: author.displayName }
      });
    }

    // ========================
    // 3️⃣ Crear usuario admin
    // ========================
    const adminExists = await User.findOne({ 
      where: { username: process.env.ADMIN_USERNAME || 'admin' } 
    });

    if (!adminExists) {
      const defaultPassword = process.env.ADMIN_PASSWORD || 'Admin1234';
      //const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      await User.create({
        username: process.env.ADMIN_USERNAME || 'admin',
        email: process.env.ADMIN_EMAIL || 'admin@example.com',
        password: defaultPassword,
        roleId: 1,      // Administrador
        authorId: 1     // Redaccion
      });

      console.log(`✅ Usuario  creado con password:  ${defaultPassword}`);
    } else {
      console.log(`ℹ️ Usuario ${adminExists.username} ya existe`);
    }

  } catch (err) {
    console.error('❌ Error inicializando datos:', err);
  }
}

module.exports = { initData };