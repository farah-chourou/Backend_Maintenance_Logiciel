const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TacheModel = new Schema(
  {
    nom: { type: String, required: true },
    type: { type: String, required: true },
    dateAffectation: { type: Date, required: true },
    dateCloture: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tache", TacheModel);
