module.exports = (Model) => async (req, res, next) => {
  const resource = await Model.findById(req.params.id);
  if (!resource || resource.user.toString() !== req.user.id)
    return res.status(403).json({ error: "Forbidden" });

  req.resource = resource;
  next();
};
