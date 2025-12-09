const express = require('express');
const router = express.Router();

const {personalSetting, appSetting, getSettings} = require('../controllers/settingControllers');

//get default setting if no settings is crested
router.get('/', getSettings);

// Personal settings (name, email)
router.post("/personal", personalSetting);

// App settings (theme, language, currency, region)
router.post("/app", appSetting);

module.exports = router;
