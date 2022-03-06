const trycatch = require('express-async-handler');

// Import the Source Model
const Source = require('../../models/Source.js');

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
  const newSource = new Source(formatSource(req.body, req.user));
  const savedSource = await newSource.save();
  if (savedSource) { res.status(200).json(savedSource); }
  else { res.status(404); throw new Error("Unable to save new source."); }
});

// PUT -> api/sources/id -> edit the source with the given id | private
const editSource = trycatch( async (req, res) => {
  const source = await Source.findById(req.params.id);
  if (source) {
    const entries = formatSource(req.body, req.user);
    Object.assign(source, entries);
    const savedSource = await source.save();
    if (savedSource) { res.status(200).json(savedSource); }
    else { res.status(400); throw new Error("Unable to edit selected source."); }
  } else { res.status(404); throw new Error("Unable to locate selected source."); }
});

// DELETE -> api/sources/id -> remove the source with the given id | private
const removeSource = trycatch( async (req, res) => {
  const source = await Source.findById(req.params.id);
  if (source) {
    const removed = await source.remove();
    if (removed) { res.status(200).json(req.params.id); }
    else { res.status(400); throw new Error("Unable to remove selected source."); }
  } else { res.status(404); throw new Error("Unable to locate selected source."); }
});

const formatSource = (body, user) => {
  return {
    name:    body.name.toLowerCase(),
    user_id: user ? user._id : undefined,
  };
}

module.exports = { getSources, getSource, createSource, editSource, removeSource };
