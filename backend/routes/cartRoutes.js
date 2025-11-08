// backend/routes/cartRoutes.js
import express from "express";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

const router = express.Router();
const MOCK_USER = "user123"; // keep a simple mock user

// GET /api/cart  -> user's cart + total
router.get("/", async (req, res) => {
  try {
    const items = await Cart.find({ userId: MOCK_USER }).populate("product");
    const cartItems = items.map(i => ({
      _id: i._id,
      productId: i.product._id,
      name: i.product.name,
      price: i.product.price,
      qty: i.qty
    }));
    const total = cartItems.reduce((s, it) => s + it.price * it.qty, 0);
    res.json({ items: cartItems, total });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart", error: err.message });
  }
});

// POST /api/cart  -> add or update { productId, qty }
router.post("/", async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty || qty < 1) return res.status(400).json({ message: "productId and qty>=1 required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // check existing
    let existing = await Cart.findOne({ userId: MOCK_USER, product: product._id });
    if (existing) {
      existing.qty = existing.qty + Number(qty);
      await existing.save();
      return res.status(200).json(existing);
    }

    // create
    const newItem = new Cart({ userId: MOCK_USER, product: product._id, qty: Number(qty) });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
});

// DELETE /api/cart/:id  -> remove item (by cart id)
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item", error: err.message });
  }
});

// POST /api/cart/checkout  -> mock checkout
router.post("/checkout", async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;
    if (!Array.isArray(cartItems) || !name || !email) return res.status(400).json({ message: "cartItems, name, email required" });

    const total = cartItems.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 0), 0);
    const timestamp = new Date().toISOString();

    // clear cart for mock user
    await Cart.deleteMany({ userId: MOCK_USER });

    res.json({ success: true, total, timestamp, user: { name, email } });
  } catch (err) {
    res.status(500).json({ message: "Checkout failed", error: err.message });
  }
});

export default router;
