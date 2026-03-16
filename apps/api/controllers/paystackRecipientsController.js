const service = require("../services/paystackRecipientsService");

const create = async (req, res) => {
  try {
    const result = await service.createRecipient(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const bulk = async (req, res) => {
  try {
    const result = await service.createRecipientsBulk(req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const list = async (req, res) => {
  try {
    const result = await service.listRecipients(req.query);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const fetchOne = async (req, res) => {
  try {
    const result = await service.fetchRecipient(req.params.idOrCode);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const result = await service.updateRecipient(req.params.idOrCode, req.body);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await service.deleteRecipient(req.params.idOrCode);
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

module.exports = {
  create,
  bulk,
  list,
  fetchOne,
  update,
  remove,
};

/**
 * FILE ROLE:
 * HTTP controller for Paystack transfer recipients.
 *
 * CONNECTS TO:
 * - services/paystackRecipientsService.js
 *
 * USED BY:
 * - routes/paystackRoutes.js
 *
 * NOTES:
 * - Used by payoutService to send releases to user banks.
 */
