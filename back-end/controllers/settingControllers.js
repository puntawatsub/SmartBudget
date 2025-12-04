const Setting = require('../models/settingModel');
const validator = require ('validator');

// create or update personal setting
const personalSetting = async (req, res)=> {
    const {name, email} = req.body;
    const userId = req.user._id;
    console.log(JSON.stringify(req.body));

    try{
        if(!name || !email )
            throw new Error('All fields are required!');

        if (!validator.isEmail(email))
            throw new Error('Email is not valid');

        // find existing or create new
        const personalInfo = await Setting.findOneAndUpdate(
            {userId},
            {name, email},
            {new:true , upsert:true} // (new:true) = updated version of doc and (upsert:true)= update or insert
        
        );
        res.status(200).json({message: 'Personal info updated successfully', data: personalInfo});
    
    }catch(err){
        res.status(500).json({err: err.message});

    }
            
    
};

// App setting

const appSetting = async (req, res)=> {
    const {theme, language, currency , region} = req.body;
    const userId = req.user._id;
    console.log(JSON.stringify(req.body));

    if( !theme || !language || !currency|| !region){
    return res.status(400).json({message: "All fields are required"});
  }

  //enum validation
  const chooseTheme = ['Light','Dark'];
  if(!chooseTheme.includes(theme)){
    return res.status(400).json({message: ' Invalid Theme'});
  }

  const chooseLanguage = ['English','Finnish'];
  if(!chooseLanguage.includes(language)){
    return res.status(400).json({message: ' Invalid language'});
  }

  
  const chooseCurrency = ['USD', 'Euro'];
  if(!chooseCurrency.includes(currency)){
   return res.status(400).json({message: ' Invalid currency'});
  }
  
  const chooseRegion = ['USA', 'Finland'];
  if(!chooseRegion.includes(region)){
    return res.status(400).json({message: ' Invalid region'});
  }

  try{
    //save and update app settings
    const app = await Setting.findOneAndUpdate(
        {userId},
        {theme, language, currency, region},
        {new:true, upsert:true, runValidators:true}
    );
      res.status(200).json({
        message: 'App settings updated successfully',
        data: app,
      });
    }catch(err){
        res.status(500).json({err: err.message});
    }
  
};

module.exports = {
    personalSetting,
    appSetting,
};