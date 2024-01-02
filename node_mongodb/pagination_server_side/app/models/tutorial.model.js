module.exports = (mongoose, mongoosePaginate) => {
  const schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);

  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};
