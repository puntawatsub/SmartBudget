const express = require('express');
const router = express.Router();

const {personalSetting, appSetting} = require('../controllers/settingControllers');

// Get current user's settings
router.get("/", async (req, res) => {
    const Setting = require('../models/settingModel');
    try {
        const settings = await Setting.findOne({ userId: req.user._id });
        if (!settings) return res.status(404).json({ message: "Settings not found" });
        res.status(200).json(settings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Personal settings (name, email)
router.post("/personal", personalSetting);

// App settings (theme, language, currency, region)
router.post("/app", appSetting);

module.exports = router;
