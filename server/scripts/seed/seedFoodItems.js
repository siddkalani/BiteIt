const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const FoodItem = require("../../models/foodItemModel"); // Adjust the path as needed

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const predefinedFoodItems = [
  {
    categoryId: "YOUR_CATEGORY_ID_HERE", // Replace with actual category ID
    itemName: "Veggie Sandwich",
    itemPrice: 50,
    itemIngredients: "Lettuce, Tomato, Cheese, Bread",
    image: "path/to/image.jpg",
    itemQuantity: 10,
    isOnline: true,
  },
  {
    categoryId: "YOUR_CATEGORY_ID_HERE", // Replace with actual category ID
    itemName: "Chicken Burger",
    itemPrice: 120,
    itemIngredients: "Chicken Patty, Lettuce, Cheese, Bun",
    image: "path/to/image.jpg",
    itemQuantity: 15,
    isOnline: true,
  },
  // Add more items as needed
];

const seedFoodItems = async () => {
  try {
    const itemNames = predefinedFoodItems.map(item => item.itemName);

    // Check for existing items to avoid duplicates
    const existingItems = await FoodItem.find({
      itemName: { $in: itemNames },
    }).select("itemName");

    const existingItemsSet = new Set(existingItems.map(item => item.itemName));

    // Filter out items that are already in the database
    const newFoodItems = predefinedFoodItems.filter(
      item => !existingItemsSet.has(item.itemName)
    );

    // Bulk insert new food items if any
    if (newFoodItems.length > 0) {
      await FoodItem.insertMany(newFoodItems);
      console.log("Food items seeded successfully.");
    } else {
      console.log("All predefined food items are already seeded.");
    }
  } catch (error) {
    console.error("Error seeding food items:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedFoodItems();
