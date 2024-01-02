module.exports = (app) => {
  const products = require("../controllers/product.controller");

  const router = require("express").Router();

  // Create a new products
  router.post("/", products.create);

  // Retrieve all products
  router.get("/", products.findAll);

  // Retrieve all availability products
  router.get("/availability", products.findAllAvailability);

  // Retrieve a single Tutorial with id
  router.get("/:id", products.findOne);

  // Update a Tutorial with id
  router.put("/:id", products.update);

  // Delete a Tutorial with id
  router.delete("/:id", products.delete);

  // Delete all products
  router.delete("/", products.deleteAll);

  app.use("/api/products", router);
};
