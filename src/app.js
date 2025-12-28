const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Personal Knowledge Base API is running"
  });
});

app.use("/auth", require("./routes/auth.routes"));
app.use("/notes", require("./routes/note.routes"));
app.use("/folders", require("./routes/folder.routes"));

module.exports = app;

