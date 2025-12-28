const cron = require("node-cron");
const Note = require("../models/Note");

cron.schedule("0 0 * * *", async () => {
  const days = Number(process.env.BIN_RETENTION_DAYS || 7);
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  await Note.deleteMany({
    isDeleted: true,
    deletedAt: { $lt: cutoff }
  });
});
