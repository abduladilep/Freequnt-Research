const express = require("express");
const router = express.Router();
const {
  serviceArea,
  FormSubmit,
  ClientData,
} = require("../Controller/UserConroller");

router.get("/service", serviceArea);
router.post("/formdata", FormSubmit); 
router.get("/clientdata", ClientData);

module.exports = router;
