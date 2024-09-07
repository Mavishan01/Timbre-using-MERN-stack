const crypto = require('crypto');
const payHere = (req, res) => {
  const { merchant_id, order_id, amount, currency, merchantSecret } = req.body;
  if (!merchant_id || !order_id || !amount || !currency || !merchantSecret) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const formattedAmount = parseFloat(amount).toFixed(2);
  const hashString =
    merchant_id +
    order_id +
    formattedAmount +
    currency +
    crypto.createHash("md5").update(merchantSecret).digest("hex").toUpperCase();
  const hash = crypto
    .createHash("md5")
    .update(hashString)
    .digest("hex")
    .toUpperCase();

  res.json({
    merchant_id: merchant_id,
    order_id: order_id,
    amount: formattedAmount,
    currency: currency,
    hash: hash,
  });
};
module.exports = payHere;
