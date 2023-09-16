const mongoose = require("mongoose");
const userSheema = require("../Model/loctionSheema");
const Client = require("../Model/ClientScheema");

const serviceArea = async (req, res) => {
  try {
    const data = await userSheema.find();

    console.log("countries", data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const FormSubmit = async (req, res) => {
  try {
    const formData = req.body;

    const client = new Client({
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      dob: formData.dob,
      age: formData.age,
      gender: formData.gender,
    });

    await client.save();
    return res.status(200).json("Client Created Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("an error occured");
  }
};

const ClientData = async (req, res) => {
  try {
    const clientdata = await Client.find();
    res.status(200).json(clientdata);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  serviceArea,
  FormSubmit,
  ClientData,
};
