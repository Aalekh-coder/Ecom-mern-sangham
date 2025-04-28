const express = require("express");

const { addFeatureImage, getFeatureImages } = require("../../Controllers/common/featuresController")

const router = express.Router();

router.get("/get",getFeatureImages)
router.post("/add",addFeatureImage)


module.exports = router;