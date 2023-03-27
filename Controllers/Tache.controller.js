const TacheModel = require("../models/Tache.model");
const ProjectModel = require("../models/Projet.model");
const InformaticienModel = require("../models/Informaticien.model");
const DocumentationModel = require("../models/Documentation.model");

const mongoose = require("mongoose");

const CreateTache = async (req, res) => {
  try {
    const { idProject, idDeveloper } = req.params;
    console.log(idProject);
    console.log(idDeveloper);

    const { nom, type, dateAffectation, dateCloture } = req.body;
    const existTache = await TacheModel.findOne({ nom });
    console.log(existTache);
    if (existTache)
      return res.status(409).json({
        Message: "task already exist",
        Success: false,
      });
    const projectId = await ProjectModel.findOne({ _id: idProject });
    const developerId = await InformaticienModel.findOne({ _id: idDeveloper });

    if (!projectId || !developerId) {
      return res.status(409).json({
        Message: "task already exist",
        Success: false,
      });
    }

    const newTache = new TacheModel({
      nom,
      type,
      dateAffectation,
      dateCloture,
      idProjet: projectId,
      idDeveloper: developerId,
    });
    const createdTache = await newTache.save();

    return res.status(200).json({
      Message: "Tache created suucessfully",
      Success: true,
      data: createdTache,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const DeleteTache = async (req, res) => {
  try {
    const { _id } = req.params;
    const removeTache = await TacheModel.deleteOne({ _id });

    if (!removeTache) {
      return res.status(400).json({ Message: "Failed to delete Tache" });
    }
    return res.status(200).json({ Message: "Tache deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllTacheOfProject = async (req, res) => {
  try {
    const { idProject } = req.params;

    const Taches = await TacheModel.find({ idProjet: idProject }).populate([
      "idProjet",
      "idDeveloper",
    ]);

    return res
      .status(200)
      .json({ Message: "tasks found successfully ", data: Taches });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllTacheOfDeveloper = async (req, res) => {
  try {
    const { idDeveloper } = req.params;

    const Taches = await TacheModel.find({ idDeveloper }).populate([
      "idProjet",
      "idDeveloper",
    ]);
    if (Taches.length === 0) {
      return res.status(200).json({ Message: "No tasks found  " });
    }
    return res
      .status(200)
      .json({ Message: "Taches found successfully ", data: Taches });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllTasks = async (req, res) => {
  try {
    const { _id } = req.user;

    const Taches = await TacheModel.find({ idDeveloper: _id }).populate([
      "idProjet",
      "idDeveloper",
    ]);
    if (Taches.length === 0) {
      return res.status(200).json({ Message: "No tasks found  " });
    }
    return res
      .status(200)
      .json({ Message: "Taches found successfully ", data: Taches });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const GetAllProjects = async (req, res) => {
  try {
    const { _id } = req.user;

    const tasks = await TacheModel.find({ idDeveloper: _id }).populate(
      "idProjet"
    );

    const projectIds = [...new Set(tasks.map((task) => task.idProjet))];
    const projectObjectIds = projectIds.map(
      (id) => new mongoose.Types.ObjectId(id)
    );
    const projects = await ProjectModel.find({
      _id: { $in: projectObjectIds },
    }).populate("chefProjet");

    if (projects.length === 0) {
      return res.status(200).json({ Message: "No Project Founds  " });
    }
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: projects });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const GetOne = async (req, res) => {
  try {
    const { _id } = req.params;

    const Tache = await TacheModel.findOne({ _id });
    return res
      .status(200)
      .json({ Message: " found successfully ", data: Tache });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateInfo = async (req, res) => {
  try {
    const { _id } = req.params;
    const { idProjet, idDeveloper } = req.params;
    const { nom, type, dateAffectation, dateCloture } = req.body;

    const projectId = await ProjectModel.findOne({ _id: idProjet });
    const developerId = await InformaticienModel.findOne({ _id: idDeveloper });

    if (!projectId || !developerId) {
      return res.status(409).json({
        Message: "Tache not exist",
        Success: false,
      });
    }

    const updatedTache = await TacheModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          nom,
          type,
          dateAffectation,
          dateCloture,
          idProjet: projectId,
          idDeveloper: developerId,
        },
      },
      { new: true }
    );
    if (!updatedTache) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "Tache updated", data: updatedTache });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateEtat = async (req, res) => {
  try {
    const { _id } = req.params;
    const { etat } = req.body;

    if (!_id || !etat) {
      return res.status(409).json({
        Message: "Tache not exist",
        Success: false,
      });
    }

    const updatedTache = await TacheModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          etat,
        },
      },
      { new: true }
    );
    if (!updatedTache) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "task updated", data: updatedTache });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const AddDocument = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!_id) {
      return res.status(409).json({
        Message: "Tache not exist",
        Success: false,
      });
    }
    console.log(req.file.originalname);
    console.log(req.file.buffer);
    const newDoc = new DocumentationModel({
      nom: req.file.originalname,
      contenu: req.file.path,
    });
    const createdDoc = await newDoc.save();
    const updatedTache = await TacheModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          documentation: createdDoc._id,
        },
      },
      { new: true }
    );
    if (!updatedTache) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "Tache updated", data: updatedTache });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
module.exports = {
  CreateTache,
  DeleteTache,
  GetAllTacheOfProject,
  GetAllTacheOfDeveloper,
  GetOne,
  UpdateInfo,
  UpdateEtat,
  AddDocument,
  GetAllTasks,
  GetAllProjects,
};
