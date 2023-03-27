const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InformaticienModel = new Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    mail: { type: String, required: false },
    mdp: { type: String, required: false },
    tel: { type: Number, required: true },
    spec: { type: String, required: true },

    role: {
      type: String,
      default: "DEVELOPPEUR",
      enum: ["CHEF_PROJET", "DEVELOPPEUR"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Informaticien", InformaticienModel);
