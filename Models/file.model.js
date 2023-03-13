const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  p_media: {
    type: String,
  },
  p_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
});

module.exports = mongoose.model("files", fileSchema);
