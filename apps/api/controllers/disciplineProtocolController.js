const {
  createProtocol,
  listProtocols,
  updateProtocolStatus,
  recommendLeastExpensiveFrequency,
} = require("../services/disciplineProtocolService");

const create = async (req, res) => {
  try {
    const { authCode, userEmail, amount, currency, frequency, provider, isAutoRelockEnabled } = req.body || {};
    const protocol = await createProtocol({
      userId: req.user.id,
      authCode,
      userEmail,
      amount,
      currency,
      frequency,
      provider,
      isAutoRelockEnabled,
    });
    return res.status(201).json({ ok: true, protocol });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const list = async (req, res) => {
  try {
    const protocols = await listProtocols(req.user.id);
    return res.status(200).json({ ok: true, protocols });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const pause = async (req, res) => {
  try {
    const protocol = await updateProtocolStatus({
      userId: req.user.id,
      protocolId: req.params.protocolId,
      status: "paused",
    });
    return res.status(200).json({ ok: true, protocol });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const resume = async (req, res) => {
  try {
    const protocol = await updateProtocolStatus({
      userId: req.user.id,
      protocolId: req.params.protocolId,
      status: "active",
    });
    return res.status(200).json({ ok: true, protocol });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const cancel = async (req, res) => {
  try {
    const protocol = await updateProtocolStatus({
      userId: req.user.id,
      protocolId: req.params.protocolId,
      status: "cancelled",
    });
    return res.status(200).json({ ok: true, protocol });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const recommendation = async (_req, res) => {
  try {
    const result = recommendLeastExpensiveFrequency();
    return res.status(200).json({ ok: true, recommendation: result });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  create,
  list,
  pause,
  resume,
  cancel,
  recommendation,
};
