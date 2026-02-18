const LegacyLock = require("../models/LegacyLock");

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const getTargetDate = (beneficiaryDOB, targetAge) => {
  const birthDate = new Date(beneficiaryDOB);
  const targetDate = new Date(birthDate);
  targetDate.setFullYear(targetDate.getFullYear() + Number(targetAge || 21));
  return targetDate;
};

const mapLegacyLock = (lock) => {
  const targetDate = getTargetDate(lock.beneficiaryDOB, lock.targetAge);
  const now = new Date();
  const msToTarget = targetDate.getTime() - now.getTime();
  const daysToTarget = Math.ceil(msToTarget / MS_PER_DAY);
  const transferWindowOpen = daysToTarget <= 30;

  return {
    ...lock.toObject(),
    targetDate,
    daysToTarget,
    transferWindowOpen,
  };
};

const create = async (req, res) => {
  try {
    const { beneficiaryName, beneficiaryDOB, targetAge, amount } = req.body || {};
    if (!beneficiaryName || !beneficiaryDOB || !amount) {
      return res.status(400).json({
        ok: false,
        message: "beneficiaryName, beneficiaryDOB, and amount are required.",
      });
    }

    const legacyLock = await LegacyLock.create({
      grantorId: req.user.id,
      beneficiaryName: String(beneficiaryName).trim(),
      beneficiaryDOB: new Date(beneficiaryDOB),
      targetAge: Number(targetAge || 21),
      amount: Number(amount),
      status: "growing",
    });

    return res.status(201).json({ ok: true, legacyLock: mapLegacyLock(legacyLock) });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const list = async (req, res) => {
  try {
    const locks = await LegacyLock.find({ grantorId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({
      ok: true,
      legacyLocks: locks.map(mapLegacyLock),
    });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const setIrrevocable = async (req, res) => {
  try {
    const { legacyLockId } = req.params;
    const lock = await LegacyLock.findOne({ _id: legacyLockId, grantorId: req.user.id });
    if (!lock) {
      return res.status(404).json({ ok: false, message: "Legacy lock not found." });
    }
    if (lock.isIrrevocable) {
      return res.status(200).json({ ok: true, legacyLock: mapLegacyLock(lock) });
    }

    lock.isIrrevocable = true;
    lock.irrevocableAt = new Date();
    await lock.save();

    return res.status(200).json({ ok: true, legacyLock: mapLegacyLock(lock) });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

const transferReadiness = async (req, res) => {
  try {
    const { legacyLockId } = req.params;
    const lock = await LegacyLock.findOne({ _id: legacyLockId, grantorId: req.user.id });
    if (!lock) {
      return res.status(404).json({ ok: false, message: "Legacy lock not found." });
    }

    const mapped = mapLegacyLock(lock);
    return res.status(200).json({
      ok: true,
      readiness: {
        legacyLockId: lock._id,
        transferWindowOpen: mapped.transferWindowOpen,
        daysToTarget: mapped.daysToTarget,
        targetDate: mapped.targetDate,
        status: lock.status,
      },
    });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

module.exports = {
  create,
  list,
  setIrrevocable,
  transferReadiness,
};

