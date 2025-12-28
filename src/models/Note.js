const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  tags: [String],

  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder"
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  status: {
    type: String,
    enum: ["draft", "active", "archived"],
    default: "draft"
  },

  isPinned: {
    type: Boolean,
    default: false
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  deletedAt: {
    type: Date
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date
  }
});

module.exports = mongoose.model("Note", noteSchema);
