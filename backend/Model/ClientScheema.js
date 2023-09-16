const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      require: [true, "Firstname is Required Field"],
      validate: {
        validator: /^[A-Za-z]+$/,
        message: "Only alphabetic characters are allowed for firstname",
      },
    },
    lastname: {
      type: String,
      require: [true, "Lastname is Required Field"],
      validate: {
        validator: /^[A-Za-z]+$/,
        message: "Only alphabetic characters are allowed for Lastname",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    },

    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      // required: true,
      // validate: {
      //   validator: dob => (new Date() - dob) / 31557600000 <= 14,
      //   message: 'Age must be at least 14 years.',
      // },
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", ClientSchema);
