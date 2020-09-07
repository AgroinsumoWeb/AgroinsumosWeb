const { Schema, model } = require("mongoose");

const SearchSchema = new Schema({
  search: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  office: {
    type: String,
    required: true,
  },
  branchoffice: {
    type: String,
    required: true,
  },
  auditoria: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = model("Searchs", SearchSchema);
