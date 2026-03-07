// checkRole.js
// Middleware para verificar si el usuario tiene el rol necesario

const checkRole = (allowedRoleIds) => {
    // allowedRoleIds será un array con los IDs de rol permitidos, ej: [1] o [1, 2]
    return (req, res, next) => {

      //console.log("USER DESDE TOKEN en checkRole:", req.user);

      const userRoleId = req.user.roleId; // ahora usamos roleId desde el token
  
      if (userRoleId === undefined || userRoleId === null) {
        return res.status(403).json({ error: 'Rol no definido' });
      }
  
      if (!allowedRoleIds.includes(userRoleId)) {
        return res.status(403).json({ error: 'No tienes permisos para acceder a esta ruta' });
      }
  
      next();
    };
  };
  
  module.exports = checkRole;