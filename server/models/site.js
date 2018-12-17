const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({

});

const Site = mongoose.model('Site', siteSchema);

module.exports = { Site }