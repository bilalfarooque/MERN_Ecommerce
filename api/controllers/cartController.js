import Cart from "../models/Cart.js";

//create
export const createCartController = async (req, res) => {
  try {
    const newCart = new Cart(req.body);

    const CartData = await newCart.save();
    !CartData
      ? res.status(404).json({
          status: false,
          error: "post not saved",
        })
      : res.status(200).json(CartData);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateCartController = async (req, res) => {
  try {
    // Use findByIdAndUpdate with options to return the updated document
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // This option returns the updated document
      runValidators: true, // This option ensures that the update runs validation
    });

    if (!updatedCart) {
      // If no Cart is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No Cart Found",
      });
    }

    // If the Cart is found and updated, return a success response
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete
export const deleteCartController = async (req, res) => {
  try {
    // Use findByIdAndDelete with options
    const deleteCart = await Cart.findByIdAndDelete(req.params.id);

    if (!deleteCart) {
      // If no Cart is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No Cart Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Cart deleted Successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//get Cart
export const getCartController = async (req, res) => {
  try {
    // Use findById
    const getCart = await Cart.findOne({userId : req.params.userId});

    if (!getCart) {
      // If no Cart is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No Cart Found",
      });
    }

    res.status(200).json(getCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all Carts
export const getCartsController = async (req, res) => {
  const query = req.query.new;
  try {
    const getCarts = query
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find();

    if (!getCarts) {
      // If no Cart is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No Carts Found",
      });
    }

    res.status(200).json(getCarts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// export const getCartStats = async (req, res) => {
//   const currentDate = new Date(); // Get the current date
//   const lastYear = new Date(
//     currentDate.setFullYear(currentDate.getFullYear() - 1)
//   ); // Correctly calculate last year

//   try {
//     const data = await Cart.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: 1 }, // Changing 'total' to 'CartCount'
//         },
//       },
//       {
//         $project: {
//           month: "$_id", // Renaming _id to month
//           CartCount: "$total", // Keeping CartCount as it is
//           _id: 0, // Omitting _id from the final output
//         },
//       },
//     ]);
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json(err);
//   }
// };
