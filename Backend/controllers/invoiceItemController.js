const mongoose = require("mongoose");
const Invoice = require("../models/invoice");
const InvoiceItem = require("../models/invoice_item");
const Customer = require("../models/customer");

const getInvoiceItemSById = async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await Invoice.findById(id)
      .populate("customer_id", ["first_name", "last_name", "email", "address"])
      .populate("delivery_status_id", "status");
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    const invoiceItems = await InvoiceItem.find({ invoice_id: id })
      .populate("product_id", ["title", "price", "img_card"])
      .sort({ createdAt: -1 });
    if (!invoiceItems) {
      return res.status(404).json({ message: "Invoice item not found" });
    }
    res
      .status(200)
      .json({ message: "success", items: invoiceItems, invoice: invoice });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const getPurchaseHistory = async (req, res) => {
    const { customerId } = req.params;
  
    try {
      const invoices = await Invoice.find({ customer_id: customerId })
        .populate("customer_id", ["first_name", "last_name", "email", "address"])
        .populate("delivery_status_id", "status");
      
      if (!invoices.length) {
        return res.status(404).json({ message: "No invoices found for this customer" });
      }
      const invoiceIds = invoices.map(invoice => invoice._id);
      const invoiceItems = await InvoiceItem.find({ invoice_id: { $in: invoiceIds } })
        .populate("product_id", ["title", "price", "img_card"])
        .sort({ createdAt: -1 });
      if (!invoiceItems.length) {
        return res.status(404).json({ message: "No invoice items found for these invoices" });
      }
      res.status(200).json({
        message: "Success",
        invoices: invoices,
        items: invoiceItems
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
  };
module.exports = {
  getInvoiceItemSById,
  getPurchaseHistory
};
