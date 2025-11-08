import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      // Insert 8 mock products
      const mockProducts = [
        { name: "Headphones", price: 1999, image:"/images/headphone.jpg" },
        { name: "Smart Watch", price: 2999, image:"/images/smartwatch.jpg" },
        { name: "Laptop", price: 49999, image:"/images/laptop.jpg" },
        { name: "Camera", price: 15999, image:"/images/camera.jpg" },
        { name: "Shoes", price: 1299, image:"/images/shoes.jpg" },
        { name: "T-shirt", price: 499, image:"/images/tshirt.jpg" },
        { name: "Power Bank", price: 999, image:"/images/powerbank.jpg" },
        { name: "Bag", price: 799, image:"/images/bag.jpg" },
      ];
      await Product.insertMany(mockProducts);
    }
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
