const express = require('express');
const router = express.Router();
// const auth = require("../middleware/auth");


const {
    getAllSignups,
    createSignup,
    getSignupById,
    updateSignup,
    deleteSignup
} = require('../controllers/signupControllers');
 
router.get('/', getAllSignups);
// router.use(auth);
router.post("/", createSignup);
router.get("/:signupId", getSignupById);
router.put("/:signupId", updateSignup);
router.delete("/:signupId", deleteSignup);

 module.exports = router;