const trycatch = require('express-async-handler');

// Import the Liability Model
const Liability = require('../../models/Liability.js');

// GET -> api/liabilities/ -> get all of the user's liabilities | private
const getLiabilities = trycatch( async (req, res) => {
  if (req.user) {
    const liabilities = await Liability.find({ user_id: req.user._id });
    if (liabilities) { res.json(liabilities); }
    else { res.status(404); throw new Error("No liabilities found."); }
  }
});

// GET -> api/liabilities/id -> get the liability with the given id | private
const getLiability = trycatch( async (req, res) => {
  const liability = await Liability.findById(req.params.id);
  if (liability) { res.status(200).json(liability); }
  else { res.status(404); throw new Error("Liability not found."); }
});

// POST -> api/liabilities/ -> create a new liability for the user | private
const createLiability = trycatch( async (req, res) => {
  const newLiability = new Liability(formatLiability(req.body, req.user));
  const savedLiability = await newLiability.save();
  if (savedLiability) { res.status(200).json(savedLiability); }
  else { res.status(404); throw new Error("Unable to save new liability."); }
});

// PUT -> api/liabilities/id -> edit the liability with the given id | private
const editLiability = trycatch( async (req, res) => {
  const liability = await Liability.findById(req.params.id);
  if (liability) {
    Object.assign(liability, formatLiability(req.body, req.user));
    const savedLiability = await liability.save();
    if (savedLiability) { res.status(200).json(savedLiability); }
    else { res.status(400); throw new Error("Unable to edit selected liability."); }
  } else { res.status(404); throw new Error("Unable to locate selected liability."); }
});

// DELETE -> api/liabilities/id -> remove the liability with the given id | private
const removeLiability = trycatch( async (req, res) => {
  const liability = await Liability.findById(req.params.id);
  if (liability) {
    const removed = await liability.remove();
    if (removed) { res.status(200).json(req.params.id); }
    else { res.status(400); throw new Error("Unable to remove selected liability."); }
  } else { res.status(404); throw new Error("Unable to locate selected liability."); }
});

const formatLiability = (body, user) => {
  return {
    name:     body.name,
    user_id:  user ? user._id : null,
    category: body.category,
    balance: {
      initial:         body.balance.initial,
      remaining:       body.balance.remaining,
      payed_total:     body.balance.payed_total,
      payed_interest:  body.balance.payed_interest,
      payed_principle: body.balance.payed_principle,
    },
    date: new Date(body.date + 'T00:00:00'),
    currency:  body.currency,
    interest:      Number(body.interest)
  };
}

module.exports = { getLiabilities, getLiability, createLiability, editLiability, removeLiability };
