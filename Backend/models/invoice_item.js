const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    qty: { type: Number, required: true },
    invoice_id: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
  },
  { timestamps: true }
);

const InvoiceItem = mongoose.model("InvoiceItem", invoiceItemSchema);

module.exports = InvoiceItem;
