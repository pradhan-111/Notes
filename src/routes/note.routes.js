const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const own = require("../middleware/ownership.middleware");
const Note = require("../models/Note");
const ctrl = require("../controllers/note.controller");

/* CRUD */
router.post("/", auth, ctrl.createNote);
router.get("/", auth, ctrl.getNotes);
router.get("/:id", auth, own(Note), ctrl.getNoteById);
router.put("/:id", auth, own(Note), ctrl.updateNote);
router.patch("/:id", auth, own(Note), ctrl.updateNote);

/* Lifecycle */
router.put("/archive/:id", auth, own(Note), ctrl.archiveNote);
router.put("/unarchive/:id", auth, own(Note), ctrl.unarchiveNote);

/* Pin */
router.put("/pin/:id", auth, own(Note), ctrl.togglePin);

/* Bin */
router.delete("/:id", auth, own(Note), ctrl.deleteNote);
router.get("/bin/all", auth, ctrl.getBinNotes);
router.put("/restore/:id", auth, own(Note), ctrl.restoreNote);
router.delete("/bin/:id", auth, own(Note), ctrl.permanentDelete);

/* Bulk */
router.delete("/bulk/delete", auth, ctrl.bulkDelete);

module.exports = router;
