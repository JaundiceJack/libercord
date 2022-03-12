const trycatch = require('express-async-handler');

// Import the Source Model
const Source = require('../../models/Source.js');
const Income = require('../../models/Income.js');

// GET -> api/sources/ -> get all of the user's sources | private
const getSources = trycatch( async (req, res) => {
  if (req.user) {
    const sources = await Source.find({ user_id: req.user._id });
    if (sources) { res.json(sources); }
    else { res.status(404); throw new Error("No sources found."); }
  }
});

// GET -> api/sources/id -> get the source with the given id | private
const getSource = trycatch( async (req, res) => {
  const source = await Source.findById(req.params.id);
  if (source) { res.status(200).json(source); }
  else { res.status(404); throw new Error("Source not found."); }
});

// POST -> api/sources/ -> create a new source for the user | private
const createSource = trycatch( async (req, res) => {
  const existing = await Source.findOne(
    { user_id: req.user._id, name: req.body.name.toLowerCase() });
  if (!existing) {
    const newSource = new Source(formatSource(req.body, req.user));
    const savedSource = await newSource.save();
    if (savedSource) { res.status(200).json(savedSource); }
    else { res.status(404); throw new Error("Unable to save new source."); }
  } else { res.status(200).json(existing); }
});

// PUT -> api/sources/id -> edit the source with the given id | private
const editSource = trycatch( async (req, res) => {
  const source = await Source.findById(req.params.id);
  if (source) {
    const entries = formatSource(req.body, req.user);
    Object.assign(source, entries);
    const savedSource = await source.save();
    if (savedSource) { res.status(200).json(savedSource); }
    else { res.status(400); throw new Error("Unable to edit the selected source."); }
  } else { res.status(404); throw new Error("Unable to locate the selected source."); }
});

// DELETE -> api/sources/id -> remove the source with the given id | private
const removeSource = trycatch( async (req, res) => {
  const source = await Source.findById(req.params.id);
  if (source) {
    if (!source.isDefault || req.user.isAdmin) {
      // Remove the source from each Income and set the default source
      const incomesDefaulted = await defaultIncomeSources(req.user._id, source._id);
      if (incomesDefaulted === true) {
        const removed = await source.remove();
        if (removed) { res.status(200).json(req.params.id);
        } else { res.status(400); throw new Error("Unable to remove the selected source."); }
      } else { res.status(400); throw new Error(incomesDefaulted); }
    } else { res.status(400); throw new Error("Unable to remove the default source."); }
  } else { res.status(404); throw new Error("Unable to locate the selected source."); }
});

// Remove the source from each Income and set the default source
const defaultIncomeSources = (userId, deletedSourceId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const incomes = await Income.find({ user_id: userId, source: deletedSourceId });
      const defaultSource = await Source.findOne({ user_id: userId, isDefault: true });
      if (!incomes) resolve(true)
      else if (incomes && defaultSource) {
        incomes.forEach(async income => {
          income.source = defaultSource._id;
          await income.save()
        });
        resolve(true);
      } else { reject("No default source, deletion canceled.") }
    } catch (e) { reject(e) }
  })
}

const formatSource = (body, user) => {
  return {
    name:    body.name.toLowerCase(),
    user_id: user ? user._id : undefined,
  };
}

module.exports = { getSources, getSource, createSource, editSource, removeSource };
