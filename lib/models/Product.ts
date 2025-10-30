import mongoose, { Schema, models } from "mongoose"

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["magazines", "journals", "scrapbooks", "tools"],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    customizable: {
      type: Boolean,
      default: false,
    },
    colors: [String],
    designs: [String],
    keywords: [String],
    seoTitle: String,
    seoDescription: String,
  },
  {
    timestamps: true,
  }
)

const Product = models.Product || mongoose.model("Product", ProductSchema)

export default Product
