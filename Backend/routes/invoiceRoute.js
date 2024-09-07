const express = require("express");
const router = express.Router();

const { getAllInvoice, saveInvoice, updateDeliveryStatus, getOrderCount } = require("../controllers/invoiceController")

router.get('/', getAllInvoice)
router.post('/createInvoice', saveInvoice)
router.put('/updateInvoice/:id', updateDeliveryStatus)

router.get('/get/orderCount', getOrderCount);


module.exports = router