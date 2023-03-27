const ProjectModel = require("../models/Projet.model");
const InformaticienModel = require("../models/Informaticien.model");

const bcrypt = require("bcrypt");
const Mailer = require("../functions/mail/MailSneder");
const MailMessage = require("nodemailer/lib/mailer/mail-message");

const CreateProject = async (req, res) => {
  try {
    console.log("ggg");

    const { nom, description } = req.body;
    console.log(nom);

    const { _id } = req.user;
    console.log(_id);

    const existProject = await ProjectModel.findOne({ nom });
    if (existProject)
      return res.status(409).json({
        Message: "Project already exist",
        Success: false,
      });

    const chef = await InformaticienModel.findOne({ _id });

    const newProject = new ProjectModel({
      nom: nom,
      description: description,
      chefProjet: chef,
    });
    const createdProject = await newProject.save();

    return res.status(200).json({
      Message: "Project created suucessfully",
      Success: true,
      data: createdProject,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const DeleteProject = async (req, res) => {
  try {
    const { _id } = req.params;
    const removeProject = await ProjectModel.deleteOne({ _id });

    if (!removeProject) {
      return res.status(400).json({ Message: "Failed to delete Project" });
    }
    return res.status(200).json({ Message: "Project deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllProject = async (req, res) => {
  try {
    const Developpers = await ProjectModel.find().populate(["chefProjet"]);
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: Developpers });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetOne = async (req, res) => {
  try {
    const { _id } = req.params;

    const Developper = await ProjectModel.findOne({ _id }).populate([
      "chefProjet",
    ]);
    return res
      .status(200)
      .json({ Message: " found successfully ", data: Developper });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateInfo = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "Project updated", data: updatedProject });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  CreateProject,
  DeleteProject,
  GetAllProject,
  GetOne,
  UpdateInfo,
};
