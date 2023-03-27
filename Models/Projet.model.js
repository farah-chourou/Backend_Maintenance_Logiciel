const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjetModel = new Schema(
  {
    nom: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Projet", ProjetModel);
