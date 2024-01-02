module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      description: String,
      price: Number,
      quantity: Number,
      image: {
        data: Buffer,
        contentType: String,
      },
      category: String,
      availability: Boolean,
      rating: Number,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", schema);
  return Product;
};
