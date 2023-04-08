const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TacheModel = new Schema(
  {
    nom: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["Script SQL", "Mise à jour", "Suppression", "Preparation"],
    },
    dateAffectation: { type: Date, required: true },
    dateCloture: { type: Date, required: false },
    etat: {
      type: String,
      default: "Affecter",
      enum: ["En Cours", "Réaliser", "Affecter", "A faire"],
    },

    idProjet: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Projet",
    },

    idDeveloper: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Informaticien",
    },
    documentation: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Documentation",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tache", TacheModel);
