const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);

module.exports = (function () {mongoose.connect("mongodb+srv://UniverseProject:UniverseProject@universeproject-6hmkf.gcp.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true})})();