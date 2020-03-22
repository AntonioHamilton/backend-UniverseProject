const BuracoNegro = require("../models/BuracosNegro");

module.exports = {
  async Read(req, res) {
    const buracoNegro = await BuracoNegro.find().select({ __v: 0 });
    return res.status(200).json(buracoNegro);
  }
};
