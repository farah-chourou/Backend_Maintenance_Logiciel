const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentationModel = new Schema(
  {
    nom: { type: String, required: false },
    contenu: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Documentation", DocumentationModel);
