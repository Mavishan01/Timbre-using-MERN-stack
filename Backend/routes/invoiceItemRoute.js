const express = require("express");
const router = express.Router();

const { getInvoiceItemSById, getPurchaseHistory } = require("../controllers/invoiceItemController")

router.get('/:id', getInvoiceItemSById)
router.get('/purchase-history/:customerId',getPurchaseHistory)


module.exports = router