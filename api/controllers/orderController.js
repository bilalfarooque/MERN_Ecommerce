import Order from "../models/Order.js";

//create
export const createOrderController = async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    const OrderData = await newOrder.save();
    !OrderData
      ? res.status(404).json({
          status: false,
          error: "post not saved",
        })
      : res.status(200).json(OrderData);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateOrderController = async (req, res) => {
  try {
    // Use findByIdAndUpdate with options to return the updated document
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // This option returns the updated document
      runValidators: true, // This option ensures that the update runs validation
    });

    if (!updatedOrder) {
      // If no Order is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No Order Found",
      });
    }

    // If the Order is found and updated, return a success response
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete
export const deleteOrderController = async (req, res) => {
  try {
    // Use findByIdAndDelete with options
    const deleteOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deleteOrder) {
      // If no Order is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No Order Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Order deleted Successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//get Order
export const getOrderController = async (req, res) => {
  try {
    // Use findById
    const getOrder = await Order.find({userId : req.params.userId});

    if (!getOrder) {
      // If no Order is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No Order Found",
      });
    }

    res.status(200).json(getOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all Orders
export const getOrdersController = async (req, res) => {
  const newquery = req.query.new;
  const catquery = req.query.category;

  try {
    let getOrders;

    if(newquery){
        getOrders = await Order.find().sort({ _id: -1 }).limit(2)
          
    }else if(catquery){
        getOrders = await Order.find({
            categories : {
                $in : [catquery],
            }
        })
    }else {
        getOrders = await Order.find()
    }



    if (!getOrders) {
      // If no Order is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No Orders Found",
      });
    }

    res.status(200).json(getOrders);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getOrderStats = async (req, res) => {
  const currentDate = new Date(); // Get the current date
  const lastMonth = new Date(
    currentDate.setMonth(currentDate.getMonth() - 1)
  ); // Correctly calculate last Month
  const secondLastMonth = new Date(
    new Date().setMonth(lastMonth.getMonth()-1)
  ); // Correctly calculate last Month

  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: secondLastMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales : "$amount"
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" }, // Changing 'total' to 'OrderCount'
        },
      },
      {
        $project: {
          month: "$_id", // Renaming _id to month
          income: "$total", // Keeping OrderCount as it is
          _id: 0, // Omitting _id from the final output
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(err);
  }
};
