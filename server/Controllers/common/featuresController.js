const Feature = require("../../Models/features");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;
    const featuresImage = new Feature({
      image,
    });
    await featuresImage.save();

    res.status(201).json({
      success: true,
      data: featuresImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
const getFeatureImages = async (req, res) => {
  try {
    const Images = await Feature.find();
    res.status(200).json({
      success: true,
      data: Images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};


module.exports = {addFeatureImage,getFeatureImages}