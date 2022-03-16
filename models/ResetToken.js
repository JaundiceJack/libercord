const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resetTokenSchema = new Schema({
    user_id:    { type: Schema.Types.ObjectId, ref: "users", required: true },
    token:      { type: String, required: true },
    expiration: { type: Date, default: Date.now, expires: 3600 },
});

module.exports = mongoose.model("resetToken", resetTokenSchema);
