const Product = require("../../Models/Product");
const Cart = require("../../Models/Cart")

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Invaild data provided!",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({
      success: true,
      message: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};


const fetchCartItem = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is manadatory",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: true,
        message: "Cart not found",
      });
    }

    const vaildItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (vaildItems.length < cart.items.length) {
      cart.items = vaildItems;
      await cart.save();
    }

    const populateCartItems = vaildItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Invaild data provided",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: true,
        message: "Cart not found",
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present !",
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
      price: item.productId? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message:"Invaild data provided"
      })
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select:"image title price salePrice",
    })


    if (!cart) {
      return res.status(404).json({
        success: true,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);

    await cart.save()

    await cart.populate({
      path: "items.productId",
      select:"image title price salePrice",
    })


    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      message:"product delelte successfully",
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

// const deleteCartItem = async (req, res) => {
//   try {
//     const { userId, productId } = req.params;
//     if (!userId || !productId) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid data provided!",
//       });
//     }

//     const cart = await Cart.findOne({ userId }).populate({
//       path: "items.productId",
//       select: "image title price salePrice",
//     });

//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found!",
//       });
//     }

//     cart.items = cart.items.filter(
//       (item) => item.productId._id.toString() !== productId
//     );

//     await cart.save();

//     await cart.populate({
//       path: "items.productId",
//       select: "image title price salePrice",
//     });

//     const populateCartItems = cart.items.map((item) => ({
//       productId: item.productId ? item.productId._id : null,
//       image: item.productId ? item.productId.image : null,
//       title: item.productId ? item.productId.title : "Product not found",
//       price: item.productId ? item.productId.price : null,
//       salePrice: item.productId ? item.productId.salePrice : null,
//       quantity: item.quantity,
//     }));

//     res.status(200).json({
//       success: true,
//       data: {
//         ...cart._doc,
//         items: populateCartItems,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Error",
//     });
//   }
// };

// const deleteCartItem = async (req, res) => {
//   try {
//     const { userId, productId } = req.params;

//     // Validate userId and productId
//     if (!userId || !productId) {
//       return res.status(400).json({ success: false, message: "userId and productId are required" });
//     }

//     // Check if userId and productId are valid ObjectIds
//     if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(productId)) {
//       return res.status(400).json({ success: false, message: "Invalid userId or productId" });
//     }

//     // Find the cart for the user and remove the product
//     const cart = await Cart.findOneAndUpdate(
//       { userId },
//       { $pull: { items: { productId } } },
//       { new: true } // Return the updated cart
//     );

//     if (!cart) {
//       return res.status(404).json({ success: false, message: "Cart not found" });
//     }

//     res.status(200).json({ success: true, message: "Product removed from cart", cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };


module.exports = {
  addToCart,
  fetchCartItem,
  updateCartItemQty,
  deleteCartItem,
};
