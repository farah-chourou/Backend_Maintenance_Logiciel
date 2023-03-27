const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentationModel = new Schema(
  {
    nom: { type: String, required: true },
    contenu: { type: Buffer, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Documentation", DocumentationModel);
