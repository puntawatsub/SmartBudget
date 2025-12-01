// Model for personal information and app settings
// {
//     "name": "SmartBudget",
//     "email": "support@smartbudget.com",
//     "theme": "light",
//     "language": "en",
//     "Currency": "USD",
//     "Region": "USA"
// }



const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },

  email: { 
    type: String, 
    required: true,  
    unique: true,      // Prevent duplicate emails 
  },

   theme: {
    type: String,
    enum: ['Light', 'Dark'],
    default: 'light'
  },

  language: {
    type: String,
    enum:['English', 'Finnish'],
    default: 'English'
  },

  currency: {
    type: String,
    enum: ['USD', 'Euro'],
    default: 'USD'
  },

  region: {
    type: String,
    enum: ['USA', 'Finland'],
    default: 'USA'
  } 


}, { timestamps: true });

module.exports = mongoose.model("Setting", settingSchema);

