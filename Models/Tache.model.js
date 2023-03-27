const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TacheModel = new Schema(
  {
    nom: { type: String, required: true },
    type: { type: String, required: true },
    dateAffectation: { type: Date, required: true },
    dateCloture: { type: Date, required: true },
    etat: {
      type: String,
      default: "En Cours",
      enum: ["En Cours", "Términer", "Bloquer"],
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
