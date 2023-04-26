import mongoose, { Schema } from "mongoose";
import { IOrder } from "../Types";

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },
    },

    orderItem: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "products",
        },

        name: {
          type: String,
          required: true,
        },

        image: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    deliveryAddress: {
      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },
    },

    paymentDetail: {
      type: Object,
      required: false,
    },

    paymentIntentId: {
      type: String,
      required: true,
    },

    paymentStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Orders", OrderSchema);

export default Order;
