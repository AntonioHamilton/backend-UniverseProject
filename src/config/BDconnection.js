const mongoose = require("mongoose");
require("dotenv/config");

mongoose.set("useUnifiedTopology", true);

module.exports = (function() {
  mongoose.connect(process.env.URL_DEV, { useNewUrlParser: true });
})();
