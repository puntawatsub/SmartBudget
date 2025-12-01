const express = require('express');
const router = express.Router();

const {personalSetting, appSetting} = require('../controllers/settingControllers');

// Personal settings (name, email)
router.post("/personal", personalSetting);

// App settings (theme, language, currency, region)
router.post("/app", appSetting);

module.exports = router;
