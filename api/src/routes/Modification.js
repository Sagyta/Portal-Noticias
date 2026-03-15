const {Router} = require("express");
const {createModification, getModifications, markAsRead, deleteUserModifications} = require("../controllers/Modification");

const router = Router();

router.post("/", createModification);
router.get('/', getModifications);
router.patch('/:id/read', markAsRead);
router.delete("/user/:userId", deleteUserModifications);

module.exports = router;