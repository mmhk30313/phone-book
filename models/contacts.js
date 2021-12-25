const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 1,
      max: 20,

    },
    mobile_number: {
      type: String,
      required: true,
      max: 14,
      length: 14,
      unique: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contacts", ContactSchema);
