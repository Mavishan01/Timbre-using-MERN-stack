const express = require("express");
const router = express.Router();

const { getAllInvoice, saveInvoice, updateDeliveryStatus } = require("../controllers/invoiceController")

router.get('/', getAllInvoice)
router.post('/createInvoice', saveInvoice)
router.put('/updateInvoice/:id', updateDeliveryStatus)


module.exports = router