const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/folder.controller");

router.post("/", auth, ctrl.createFolder);
router.get("/", auth, ctrl.getFolders);
router.delete("/:id", auth, ctrl.deleteFolder);

module.exports = router;
