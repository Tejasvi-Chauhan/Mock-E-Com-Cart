import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const getCart = async (req, res) => {
  const cart = await Cart.find();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ cart, total });
};

export const addToCart = async (req, res) => {
  const { productId, qty } = req.body;
  const product = await Product.findById(productId);
  const existing = await Cart.findOne({ productId });

  if (existing) {
    existing.qty += qty;
    await existing.save();
    res.json(existing);
  } else {
    const newItem = await Cart.create({
      productId,
      name: product.name,
      price: product.price,
      qty,
    });
    res.json(newItem);
  }
};

export const removeFromCart = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
};

export const checkout = async (req, res) => {
  const { cartItems } = req.body;
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const timestamp = new Date().toISOString();

  res.json({ success: true, total, timestamp });
  await Cart.deleteMany(); // Clear cart after checkout
};
