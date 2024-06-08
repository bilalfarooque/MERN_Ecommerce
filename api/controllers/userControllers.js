import User from "../models/User.js"

export const updateUserController = async (req, res) => {
  try {
    // Use findByIdAndUpdate with options to return the updated document
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // This option returns the updated document
      runValidators: true, // This option ensures that the update runs validation
    });

    if (!updatedUser) {
      // If no User is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No User Found",
      });
    }

    // If the User is found and updated, return a success response
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete
export const deleteUserController = async (req, res) => {
  try {
    // Use findByIdAndDelete with options
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      // If no User is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No User Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "User deleted Successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//get User
export const getUserController = async (req, res) => {
  try {
    // Use findById
    const getUser = await User.findById(req.params.id);

    if (!getUser) {
      // If no User is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No User Found",
      });
    }

    res.status(200).json(getUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all Users
export const getUsersController = async (req, res) => {
  const query = req.query.new;

  try {
    const getUsers = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();

    if (!getUsers) {
      // If no User is found, return a 404 status
      return res.status(404).json({
        status: false,
        message: "No Users Found",
      });
    }

    res.status(200).json(getUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserStats = async (req, res) => {
  const currentDate = new Date(); // Get the current date
  const lastYear = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1)); // Correctly calculate last year

  try {
   const data = await User.aggregate([
  {$match: {createdAt: {$gte: lastYear}}},
  {
    $project: {
      month: {$month: "$createdAt"},
    },
  },
  {
    $group: {
      _id: "$month",
      total: {$sum: 1}, // Changing 'total' to 'userCount'
    },
  },
  {
    $project: {
      month: "$_id", // Renaming _id to month
      userCount: "$total", // Keeping userCount as it is
      _id: 0 // Omitting _id from the final output
    },
  },
]);
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(err);
  }
};
