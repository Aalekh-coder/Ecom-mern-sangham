const Address = require("../../Models/Address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      res.status(400).json({
        success: false,
        message: "fields are required",
      });
    }

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      newlyCreatedAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while handle the address",
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "user id is required",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while handle the address",
    });
  }
};
const editAddress = async (req, res) => {
  try {
      const { userId, addressId } = req.params;
      const formData = req.body

    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: "userid and addressId is required",
      });
      }
      
      const address = await Address.findByIdAndUpdate({ userId, _id: addressId }, formData, { new: true });

      if (!address) {
          return res.status(404).json({
              success: false,
              message:"Address not found"
          })
      }

      res.status(200).json({
          sucess: true,
          data:address
      })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while handle the address",
    });
  }
};


const deleteAddress = async (req, res) => {
    try {
      const { userId, addressId } = req.params;
      if (!userId || !addressId) {
        return res.status(400).json({
          success: false,
          message: "User and address id is required!",
        });
      }
  
      const address = await Address.findOneAndDelete({ _id: addressId, userId });
  
      if (!address) {
        return res.status(404).json({
          success: false,
          message: "Address not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Address deleted successfully",
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };
  

module.exports = {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
};
