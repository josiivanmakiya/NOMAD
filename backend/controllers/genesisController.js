const GenesisWaitlist = require("../models/GenesisWaitlist");
const GenesisAudit = require("../models/GenesisAudit");
const WaitlistLog = require("../models/WaitlistLog");
const User = require("../models/User");
const Deposit = require("../models/Deposit");

const BRIEFINGS = [
  {
    day: 1,
    title: "The Revelation",
    body: "A ₦4,000 daily leak compounds to ~₦1.46M yearly. Nomad Insight starts with leak visibility, not motivation.",
  },
  {
    day: 3,
    title: "The Mechanism",
    body: "Reset Rule: each new deposit resets the active timer window. Protocol favors stillness over activity.",
  },
  {
    day: 7,
    title: "The Trajectory",
    body: "Preservation first. Deployment later. The long-term path is disciplined capital transitioning into asset rails.",
  },
];

const normalizePhone = (value) => {
  const cleaned = String(value || "")
    .replace(/\s+/g, "")
    .replace(/[-()]/g, "")
    .trim();

  if (!cleaned) return "";
  if (/^\+234\d{10}$/.test(cleaned)) return cleaned;
  if (/^234\d{10}$/.test(cleaned)) return `+${cleaned}`;
  if (/^0\d{10}$/.test(cleaned)) return `+234${cleaned.slice(1)}`;
  if (/^\d{10}$/.test(cleaned)) return `+234${cleaned}`;
  return cleaned;
};

const normalizeEmail = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const isDuplicateKeyError = (error) =>
  Boolean(error && Number(error.code) === 11000);

const appendWaitlistLog = async ({
  req,
  email,
  phoneNumber,
  leakRange = "",
  outcome,
  errors = [],
}) => {
  try {
    await WaitlistLog.create({
      email,
      phoneNumber,
      leakRange,
      outcome,
      errors,
      sourcePath: req?.originalUrl || "",
      ip: req?.ip || req?.headers?.["x-forwarded-for"] || "",
      userAgent: String(req?.headers?.["user-agent"] || ""),
    });
  } catch (error) {
    console.error("Failed to write waitlist log:", error.message);
  }
};

const normalizeWeek = (value) => {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  const normalized = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  return normalized;
};

const isAdminAuthorized = (req) => {
  const configuredKey = String(process.env.ADMIN_API_KEY || "").trim();
  if (!configuredKey) {
    return process.env.NODE_ENV !== "production";
  }
  return String(req.headers["x-admin-key"] || "") === configuredKey;
};

const computeDisciplineRating = ({ timerCheckCount = 0, failedUnlockAttempts = 0, totalResets = 0, preservedCapital = 0 }) => {
  let score = 100;
  score -= Math.min(60, Number(failedUnlockAttempts || 0) * 5);
  score -= Math.min(20, Number(totalResets || 0) * 2);
  score -= Math.min(20, Math.round(Number(timerCheckCount || 0) * 0.2));
  if (Number(preservedCapital || 0) >= 50000) {
    score += 5;
  }
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  return "D";
};

const getSummary = async (_req, res) => {
  try {
    const joinedCount = await GenesisWaitlist.countDocuments({
      status: { $in: ["waitlist", "selected", "invited", "enrolled"] },
    });

    return res.status(200).json({
      ok: true,
      summary: {
        isCapped: false,
        joinedCount,
      },
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const joinWaitlist = async (req, res) => {
  try {
    const phoneNumber = normalizePhone(req.body?.phoneNumber);
    const email = normalizeEmail(req.body?.email);
    const biggestLeak = String(req.body?.biggestLeak || "").trim();
    const leakRange = String(req.body?.leakRange || "").trim();
    const tenYearGoal = String(req.body?.tenYearGoal || "").trim();
    const resetConsent = Boolean(req.body?.resetConsent ?? req.body?.agreesResetRule);
    const rawAutomationMode = String(
      req.body?.automation ?? req.body?.automationMode ?? "high_protocol"
    )
      .trim()
      .toLowerCase();
    const automationMode = rawAutomationMode;
    const errors = [];

    if (!phoneNumber) {
      errors.push({ field: "phoneNumber", message: "Phone number is required." });
    }
    const phonePattern = /^\+234\d{10}$/;
    if (phoneNumber && !phonePattern.test(phoneNumber)) {
      errors.push({
        field: "phoneNumber",
        message: "Use a valid Nigerian number: +234XXXXXXXXXX, 234XXXXXXXXXX, or 0XXXXXXXXXX.",
      });
    }
    if (!email) {
      errors.push({ field: "email", message: "Email is required." });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
      errors.push({ field: "email", message: "Invalid email format." });
    }
    if (!biggestLeak) {
      errors.push({ field: "biggestLeak", message: "Biggest leak is required." });
    }
    if (biggestLeak && biggestLeak.length > 80) {
      errors.push({ field: "biggestLeak", message: "Biggest leak is too long (max 80 chars)." });
    }
    if (!leakRange) {
      errors.push({ field: "leakRange", message: "Leak range is required." });
    }
    if (leakRange && leakRange.length > 64) {
      errors.push({ field: "leakRange", message: "Leak range is too long (max 64 chars)." });
    }
    if (!tenYearGoal) {
      errors.push({ field: "tenYearGoal", message: "10-year goal is required." });
    }
    if (tenYearGoal && tenYearGoal.length > 120) {
      errors.push({ field: "tenYearGoal", message: "10-year goal is too long (max 120 chars)." });
    }
    if (!resetConsent) {
      errors.push({
        field: "resetConsent",
        message: "You must accept the Reset Rule to proceed.",
      });
    }
    if (!["high_protocol", "manual"].includes(automationMode)) {
      errors.push({
        field: "automation",
        message: "Automation must be one of: high_protocol or manual.",
      });
    }

    if (errors.length > 0) {
      await appendWaitlistLog({
        req,
        email,
        phoneNumber,
        leakRange,
        outcome: "VALIDATION_FAILED",
        errors,
      });
      return res.status(400).json({
        ok: false,
        status: "error",
        message: errors[0].message,
        errors,
      });
    }

    const existing = await GenesisWaitlist.findOne({
      $or: [{ phoneNumber }, { email }],
    }).lean();
    if (existing) {
      await GenesisWaitlist.updateOne(
        { _id: existing._id },
        {
          $set: {
            biggestLeak,
            leakRange,
            tenYearGoal,
            agreesResetRule: resetConsent,
            automationMode,
          },
        }
      );
      await appendWaitlistLog({
        req,
        email,
        phoneNumber,
        leakRange,
        outcome: "ALREADY_JOINED",
      });
      return res.status(200).json({
        ok: true,
        status: "success",
        alreadyJoined: true,
        userId: String(existing._id),
        automation: existing.automationMode || automationMode,
        message: "You are already on the NOMAD Genesis waitlist.",
        nextStep: "Deposit setup and lock configuration will be sent via email.",
        briefings: BRIEFINGS,
      });
    }

    const entry = await GenesisWaitlist.create({
      email,
      phoneNumber,
      biggestLeak,
      leakRange,
      tenYearGoal,
      agreesResetRule: resetConsent,
      automationMode,
      status: "waitlist",
      briefingStage: 1,
    });

    const existingUser = await User.findOne({
      $or: [{ phoneNumber }, { email }],
    });
    if (existingUser) {
      existingUser.phoneNumber = phoneNumber;
      existingUser.email = email;
      existingUser.status = "waitlist";
      existingUser.isGenesisUser = true;
      if (typeof existingUser.tier !== "number") {
        existingUser.tier = 0;
      }
      await existingUser.save();
    } else {
      await User.create({
        phoneNumber,
        email,
        status: "waitlist",
        isGenesisUser: true,
        tier: 0,
      });
    }

    await appendWaitlistLog({
      req,
      email,
      phoneNumber,
      leakRange,
      outcome: "JOINED",
    });

    return res.status(201).json({
      ok: true,
      status: "success",
      userId: String(entry._id),
      automation: entry.automationMode,
      briefings: BRIEFINGS,
      message: "You're in. Welcome to the NOMAD Genesis waitlist.",
      nextStep: "Deposit setup and lock configuration will be sent via email.",
    });
  } catch (error) {
    await appendWaitlistLog({
      req,
      email: normalizeEmail(req.body?.email),
      phoneNumber: normalizePhone(req.body?.phoneNumber),
      leakRange: String(req.body?.leakRange || "").trim(),
      outcome: "SERVER_ERROR",
      errors: [{ field: "server", message: error.message }],
    });
    if (isDuplicateKeyError(error)) {
      return res.status(200).json({
        ok: true,
        status: "success",
        alreadyJoined: true,
        message: "You are already on the NOMAD Genesis waitlist.",
        nextStep: "Deposit setup and lock configuration will be sent via email.",
        briefings: BRIEFINGS,
      });
    }
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const getBriefings = async (_req, res) => {
  return res.status(200).json({ ok: true, briefings: BRIEFINGS });
};

const submitWeeklyAudit = async (req, res) => {
  try {
    const weekOf = normalizeWeek(req.body?.weekOf);
    const frictionCheck = Number(req.body?.frictionCheck);
    const impulseCheck = Number(req.body?.impulseCheck);
    const insightValue = Number(req.body?.insightValue);
    const notes = String(req.body?.notes || "").trim();

    if (!weekOf) {
      return res.status(400).json({ ok: false, message: "Valid weekOf date is required." });
    }
    if (!Number.isFinite(frictionCheck) || frictionCheck < 1 || frictionCheck > 10) {
      return res.status(400).json({ ok: false, message: "frictionCheck must be between 1 and 10." });
    }
    if (!Number.isFinite(impulseCheck) || impulseCheck < 0) {
      return res.status(400).json({ ok: false, message: "impulseCheck must be 0 or greater." });
    }
    if (!Number.isFinite(insightValue) || insightValue < 1 || insightValue > 10) {
      return res.status(400).json({ ok: false, message: "insightValue must be between 1 and 10." });
    }

    const audit = await GenesisAudit.findOneAndUpdate(
      { userId: req.user.id, weekOf },
      {
        $set: {
          frictionCheck,
          impulseCheck,
          insightValue,
          notes,
        },
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ ok: true, audit });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const listMyAudits = async (req, res) => {
  try {
    const audits = await GenesisAudit.find({ userId: req.user.id })
      .sort({ weekOf: -1 })
      .limit(26)
      .lean();
    return res.status(200).json({ ok: true, audits });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const adminUsers = async (req, res) => {
  try {
    if (!isAdminAuthorized(req)) {
      return res.status(403).json({ ok: false, message: "Admin access denied." });
    }

    const users = await User.find({
      $or: [{ isGenesisUser: true }, { status: { $in: ["waitlist", "active"] } }],
    })
      .select("phoneNumber status isGenesisUser tier metrics protocolSettings createdAt")
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    if (users.length === 0) {
      return res.status(200).json({ ok: true, users: [] });
    }

    const userIds = users.map((user) => user._id);
    const preserved = await Deposit.aggregate([
      {
        $match: {
          userId: { $in: userIds },
          state: { $in: ["LOCKED", "MATURED"] },
        },
      },
      {
        $group: {
          _id: "$userId",
          preservedCapital: { $sum: "$amount" },
        },
      },
    ]);

    const preservedMap = new Map(preserved.map((item) => [String(item._id), Number(item.preservedCapital || 0)]));

    const mapped = users.map((user) => {
      const preservedCapital = preservedMap.get(String(user._id)) || 0;
      const metrics = user.metrics || {};
      const disciplineRating = computeDisciplineRating({
        timerCheckCount: metrics.timerCheckCount || 0,
        failedUnlockAttempts: metrics.failedUnlockAttempts || 0,
        totalResets: metrics.totalResets || 0,
        preservedCapital,
      });
      return {
        id: user._id,
        phoneNumber: user.phoneNumber || "",
        status: user.status || "waitlist",
        isGenesisUser: Boolean(user.isGenesisUser),
        tier: Number(user.tier || 0),
        metrics: {
          timerCheckCount: Number(metrics.timerCheckCount || 0),
          failedUnlockAttempts: Number(metrics.failedUnlockAttempts || 0),
          totalResets: Number(metrics.totalResets || 0),
        },
        protocolSettings: user.protocolSettings || {},
        preservedCapital,
        disciplineRating,
      };
    });

    return res.status(200).json({ ok: true, users: mapped });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const adminWaitlistLogs = async (req, res) => {
  try {
    if (!isAdminAuthorized(req)) {
      return res.status(403).json({ ok: false, message: "Admin access denied." });
    }

    const parsedLimit = Number(req.query?.limit || 100);
    const limit = Math.max(1, Math.min(500, Number.isFinite(parsedLimit) ? parsedLimit : 100));

    const logs = await WaitlistLog.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return res.status(200).json({
      ok: true,
      logs: logs.map((log) => ({
        id: log._id,
        email: log.email || "",
        phoneNumber: log.phoneNumber || "",
        outcome: log.outcome || "",
        errors: Array.isArray(log.errors) ? log.errors : [],
        sourcePath: log.sourcePath || "",
        ip: log.ip || "",
        userAgent: log.userAgent || "",
        createdAt: log.createdAt,
      })),
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

const adminWaitlistEntries = async (req, res) => {
  try {
    if (!isAdminAuthorized(req)) {
      return res.status(403).json({ ok: false, message: "Admin access denied." });
    }

    const parsedLimit = Number(req.query?.limit || 200);
    const limit = Math.max(1, Math.min(1000, Number.isFinite(parsedLimit) ? parsedLimit : 200));

    const entries = await GenesisWaitlist.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return res.status(200).json({
      ok: true,
      entries: entries.map((entry) => ({
        id: entry._id,
        email: entry.email || "",
        phoneNumber: entry.phoneNumber || "",
        biggestLeak: entry.biggestLeak || "",
        leakRange: entry.leakRange || "",
        tenYearGoal: entry.tenYearGoal || "",
        agreesResetRule: Boolean(entry.agreesResetRule),
        automationMode: entry.automationMode || "high_protocol",
        status: entry.status || "waitlist",
        briefingStage: Number(entry.briefingStage || 0),
        createdAt: entry.createdAt,
      })),
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  getSummary,
  joinWaitlist,
  getBriefings,
  submitWeeklyAudit,
  listMyAudits,
  adminUsers,
  adminWaitlistLogs,
  adminWaitlistEntries,
};
