import Product from "../models/Product.js";

//create
export const createProductController = async (req, res) => {
  try {
    const newProduct = new Product(req.body);

    const productData = await newProduct.save();
    !productData
      ? res.status(404).json({
          status: false,
          error: "post not saved",
        })
      : res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProductController = async (req, res) => {
  try {
    // Use findByIdAndUpdate with options to return the updated document
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // This option returns the updated document
      runValidators: true, // This option ensures that the update runs validation
    });

    if (!updatedProduct) {
      // If no Product is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No Product Found",
      });
    }

    // If the Product is found and updated, return a success response
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete
export const deleteProductController = async (req, res) => {
  try {
    // Use findByIdAndDelete with options
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deleteProduct) {
      // If no Product is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No Product Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Product deleted Successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//get Product
export const getProductController = async (req, res) => {
  try {
    // Use findById
    const getProduct = await Product.findById(req.params.id);

    if (!getProduct) {
      // If no Product is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No Product Found",
      });
    }

    res.status(200).json(getProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all Products
export const getProductsController = async (req, res) => {
  const newquery = req.query.new;
  const catquery = req.query.category;

  try {
    let getProducts;

    if(newquery){
        getProducts = await Product.find().sort({ _id: -1 }).limit(2)
          
    }else if(catquery){
        getProducts = await Product.find({
            categories : {
                $in : [catquery],
            }
        })
    }else {
        getProducts = await Product.find()
    }



    if (!getProducts) {
      // If no Product is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No Products Found",
      });
    }

    res.status(200).json(getProducts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// export const getProductStats = async (req, res) => {
//   const currentDate = new Date(); // Get the current date
//   const lastYear = new Date(
//     currentDate.setFullYear(currentDate.getFullYear() - 1)
//   ); // Correctly calculate last year

//   try {
//     const data = await Product.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: 1 }, // Changing 'total' to 'ProductCount'
//         },
//       },
//       {
//         $project: {
//           month: "$_id", // Renaming _id to month
//           ProductCount: "$total", // Keeping ProductCount as it is
//           _id: 0, // Omitting _id from the final output
//         },
//       },
//     ]);
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json(err);
//   }
// };
