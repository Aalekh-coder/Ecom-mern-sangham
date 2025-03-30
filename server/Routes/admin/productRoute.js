const express = require("express");

const {
  handleImageUpload,
  addProduct,
  fetchAllProduct,
  editProduct,
  deleteProduct,
} = require("../../Controllers/admin/productController");
const { upload } = require("../../helps/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.get("/allProduct", fetchAllProduct);
router.put("/edit/:id",editProduct)
router.delete("/delete/:id",deleteProduct)

module.exports = router;
