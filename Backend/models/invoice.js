const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    total: { type: Number, required: true },
    delivery_status_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryStatus",
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
