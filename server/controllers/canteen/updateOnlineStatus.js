const Canteen = require("../../models/canteenModel");

const updateCanteenStatus = async (req, res) => {
  const { id } = req.params; // Canteen ID from URL params
  const { isOnline } = req.body; // New isOnline status from request body

  if (typeof isOnline !== "boolean") {
    return res.status(400).json({ message: "isOnline must be a boolean value" });
  }

  try {
    const canteen = await Canteen.findById(id);

    if (!canteen) {
      return res.status(404).json({ message: "Canteen not found" });
    }

    console.log("Canteen before update:", canteen);
    canteen.isOnline = isOnline;

    const updatedCanteen = await canteen.save();
    console.log("Canteen after update:", updatedCanteen);

    // Get io instance and emit the updated status
    const io = req.app.get("io");
    io.emit("canteenStatus", {
      canteenId: updatedCanteen._id,
      isOnline: updatedCanteen.isOnline,
    });

    res.status(200).json({ message: `Canteen status updated successfully`, canteen: updatedCanteen });
  } catch (error) {
    console.error("Error updating canteen status:", error);
    res.status(500).json({ message: "Error updating canteen status", error });
  }
};

module.exports = { updateCanteenStatus };
