const jwt = require("jsonwebtoken");
const InformaticienModel = require("../models/Informaticien.model");

const isChef = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await InformaticienModel.findOne({
      _id: decoded._id,
      role: "CHEF_PROJET",
    });
    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, Message: "Unauthorized" });
  }
};

const isDevelopper = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await InformaticienModel.findOne({
      _id: decoded._id,
      role: "DEVELOPPEUR",
    });
    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, Message: "Unauthorized" });
  }
};

const isUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await InformaticienModel.findOne({
      _id: decoded._id,
    });
    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, Message: "Unauthorized" });
  }
};

module.exports = { isChef, isDevelopper, isUser };
