const express = require("express");
const { check } = require("express-validator");
const RSController = require("../controller/reserve-table");
const router = express.Router();

router.post("/:uid",RSController.bill);

module.exports = router;
