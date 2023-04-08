const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjetModel = new Schema(
  {
    nom: { type: String, required: true },
    description: { type: String, required: true },
    etat: {
      type: String,
      default: "En Cours",
      enum: ["En Cours", "Terminer"],
    },
    chefProjet: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Informaticien",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Projet", ProjetModel);
