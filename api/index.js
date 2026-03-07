const server = require('./src/app')
const { conn } = require('./src/db');
const { initData } = require('./src/Preload/initData');

const PORT = process.env.PORT || 3001

conn.sync({ force: false }).then(() => { 

  server.get('/', (req, res) => {
    res.send('¡Hola Mundo!');
  });
  
  server.listen(PORT, () => {
    console.log('Servidor corriendo en local '); 

    // Llamamos a initData para crear rol, autor y usuario admin si no existen
     initData(); // 👈 aquí se ejecuta todo el preload
  });
}); 