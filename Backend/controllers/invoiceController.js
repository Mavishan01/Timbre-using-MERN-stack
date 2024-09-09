const mongoose = require("mongoose");
const Invoice = require("../models/invoice");
const InvoiceItem = require("../models/invoice_item");

const saveInvoice = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { customer_id, total, items, orderId } = req.body;
        const newInvoice = new Invoice({
            orderId,
            customer_id,
            total,
            delivery_status_id: "66da17e9900ae5330715ae3b",
        });
        const savedInvoice = await newInvoice.save({ session });
        const invoiceItems = items.map((item) => ({
            product_id: item.product_id, 
            order_id: item.order_id,
            qty: item.qty,
            invoice_id: savedInvoice._id,
        }));
        await InvoiceItem.insertMany(invoiceItems, { session });

        const invoice_Items = await InvoiceItem.find({ invoice_id: savedInvoice._id })
        .populate('product_id',["title","price"])
        .session(session);

        console.log("Fetched Invoice Items after Insert:", invoice_Items);

        await session.commitTransaction();
        session.endSession();
        res
            .status(201)
            .json({ message: "Invoice created successfully", invoice: savedInvoice, invoiceItems: invoice_Items });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error saving invoice:", error);
        res
            .status(500)
            .json({ message: "Failed to create invoice", error: error.message });
    }
};

const getAllInvoice = async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .populate("customer_id", ["first_name", "last_name", "address", "email"])
            .populate("delivery_status_id", "status")
            .sort({ createdAt: -1 });

        if (invoices.length === 0) {
            return res.status(404).json({ message: "No invoices found" });
        }

        res.status(200).json({
            message: "success",
            count: invoices.length,
            invoices: invoices
        });

    } catch (error) {
        console.error("Error fetching invoices:", {
            error: error.message,
            stack: error.stack
        });

        res.status(500).json({
            message: "Failed to fetch invoices",
            error: error.message
        });
    }
};

const updateDeliveryStatus = async (req, res) => {
    const { id } = req.params
    try {
        const invoice = await Invoice.findByIdAndUpdate(id, { delivery_status_id: '66da17d7900ae5330715ae3a' }, { new: true })
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" })
        }
        res.status(200).json({ message: 'success', invoice })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrderCount = async (req, res) => {
    try {
        const orderCount = await Invoice.countDocuments(); 
        console.log('order count:', orderCount);
        res.status(200).json({ count: orderCount });
    } catch (error) {
        console.error('Error getting order count:', error); 
        res.status(500).json({ error: 'Error getting order count' });
    }
};

module.exports = {
    getAllInvoice,
    saveInvoice,
    updateDeliveryStatus,
    getOrderCount
};
