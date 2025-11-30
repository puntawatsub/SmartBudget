const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userControllers');
 
router.get('/', getAllUsers);
// router.use(auth);
router.post("/", createUser);
router.get("/:UserId", getUserById);
router.put("/:UserId", updateUser);
router.delete("/:UserId", deleteUser);

 module.exports = router;