import mongoose, { Schema, models } from "mongoose"

const OrderSchema = new Schema(
  {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        customization: {
          color: String,
          design: String,
          text: String,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    customerAddress: {
      type: String,
      required: true,
    },
    customerCity: {
      type: String,
      required: true,
    },
    customerZipCode: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["credit-card", "debit-card", "paypal", "bank-transfer"],
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

const Order = models.Order || mongoose.model("Order", OrderSchema)

export default Order
