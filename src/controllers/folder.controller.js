const Folder = require("../models/Folder");

/* Create Folder */
exports.createFolder = async (req, res) => {
  const folder = await Folder.create({
    ...req.body,
    user: req.user.id
  });
  res.status(201).json(folder);
};

/* Get Folders */
exports.getFolders = async (req, res) => {
  const folders = await Folder.find({ user: req.user.id });
  res.json(folders);
};

/* Delete Folder */
exports.deleteFolder = async (req, res) => {
  await Folder.deleteOne({
    _id: req.params.id,
    user: req.user.id
  });
  res.json({ message: "Folder deleted" });
};
