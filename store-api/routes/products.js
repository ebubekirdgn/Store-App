const express = require("express");
const NodeCache = require("node-cache");
const { getAll, get, add, replace, remove } = require("../data/products");
const { isRequiredCheck, isValidImage } = require("../util/validation");

const router = express.Router();
const cache = new NodeCache({ stdTTL: 60 }); // 60 saniye cache

// GET all products with pagination and cache
router.get("/", async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const cacheKey = `products:${page}:${pageSize}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  try {
    const result = await getAll(page, pageSize);
    cache.set(cacheKey, result);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET single product
router.get("/:id", async (req, res, next) => {
  try {
    const product = await get(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Validation helper
function validateProduct(data) {
  let errors = {};
  if (!isRequiredCheck(data.title)) errors.title = "Title is required";
  if (!isRequiredCheck(data.description)) errors.description = "Description is required";
  if (!isRequiredCheck(data.image)) errors.image = "Image is required";
  if (!isValidImage(data.image)) errors.image = "Image extension is wrong.";
  return errors;
}

// POST new product
router.post("/", async (req, res, next) => {
  const data = req.body;
  const errors = validateProduct(data);

  if (Object.keys(errors).length > 0) {
    return res.status(403).json({
      message: "Adding the product failed with validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    cache.flushAll(); // Cache'i temizle
    res.status(201).json({ message: "Product saved.", product: data });
  } catch (error) {
    next(error);
  }
});

// PUT update product
router.put("/:id", async (req, res, next) => {
  const data = req.body;
  const errors = validateProduct(data);

  if (Object.keys(errors).length > 0) {
    return res.status(403).json({
      message: "Updating the product failed with validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    cache.flushAll(); // Cache'i temizle
    res.json({ message: "Product updated.", product: data });
  } catch (error) {
    next(error);
  }
});

// DELETE product
router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    cache.flushAll(); // Cache'i temizle
    res.json({ message: "Product deleted." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
