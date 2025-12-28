const Note = require("../models/Note");

/* Create Note */
exports.createNote = async (req, res) => {
  const note = await Note.create({
    ...req.body,
    user: req.user.id
  });
  res.status(201).json(note);
};

/* Get Notes with Search & Filters */
exports.getNotes = async (req, res) => {
  const query = {
    user: req.user.id,
    isDeleted: false
  };

  if (req.query.status) query.status = req.query.status;
  if (req.query.tag) query.tags = req.query.tag;
  if (req.query.pinned) query.isPinned = req.query.pinned === "true";

  if (req.query.keyword) {
    query.$or = [
      { title: new RegExp(req.query.keyword, "i") },
      { content: new RegExp(req.query.keyword, "i") }
    ];
  }

  const notes = await Note.find(query).sort({
    isPinned: -1,
    createdAt: -1
  });

  res.json(notes);
};

/* Get Single Note */
exports.getNoteById = async (req, res) => {
  res.json(req.resource);
};

/* Update Note (Auto-save Draft Supported) */
exports.updateNote = async (req, res) => {
  Object.assign(req.resource, req.body, {
    updatedAt: new Date()
  });

  await req.resource.save();
  res.json(req.resource);
};

/* Archive Note */
exports.archiveNote = async (req, res) => {
  req.resource.status = "archived";
  await req.resource.save();
  res.json({ message: "Note archived" });
};

/* Unarchive Note */
exports.unarchiveNote = async (req, res) => {
  req.resource.status = "active";
  await req.resource.save();
  res.json({ message: "Note unarchived" });
};

/* Toggle Pin */
exports.togglePin = async (req, res) => {
  req.resource.isPinned = !req.resource.isPinned;
  await req.resource.save();
  res.json({ pinned: req.resource.isPinned });
};

/* Move Note to Bin */
exports.deleteNote = async (req, res) => {
  req.resource.isDeleted = true;
  req.resource.deletedAt = new Date();
  await req.resource.save();
  res.json({ message: "Note moved to bin" });
};

/* View Bin */
exports.getBinNotes = async (req, res) => {
  const notes = await Note.find({
    user: req.user.id,
    isDeleted: true
  });
  res.json(notes);
};

/* Restore Note */
exports.restoreNote = async (req, res) => {
  req.resource.isDeleted = false;
  req.resource.deletedAt = null;
  await req.resource.save();
  res.json({ message: "Note restored" });
};

/* Permanent Delete */
exports.permanentDelete = async (req, res) => {
  await Note.deleteOne({ _id: req.resource._id });
  res.json({ message: "Note permanently deleted" });
};

/* Bulk Delete */
exports.bulkDelete = async (req, res) => {
  const { noteIds } = req.body;

  await Note.updateMany(
    { _id: { $in: noteIds }, user: req.user.id },
    { isDeleted: true, deletedAt: new Date() }
  );

  res.json({ message: "Notes moved to bin" });
};
