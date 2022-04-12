const express = require('express');
const router = express.Router();

const airbnbCtr = require("../controllers/airbnb.controller");

const vs = "/api/v1/airbnb";

router.get(vs + "/all-properties", airbnbCtr.consultarAirbnb);
router.get(vs + "/types", airbnbCtr.tiposPropiedades);
router.get(vs + "/reviews", airbnbCtr.consultarTop20Reviews);

module.exports = router;




