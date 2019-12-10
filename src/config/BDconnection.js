const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);

module.exports = (function () {mongoose.connect(process.env.URL,{useNewUrlParser: true})})();