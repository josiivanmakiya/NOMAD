/* eslint-disable no-console */
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("../models/User");
const GenesisWaitlist = require("../models/GenesisWaitlist");
const Deposit = require("../models/Deposit");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/NOMAD";

const run = async () => {
  await mongoose.connect(MONGO_URI);

  const [users, waitlist, deposits] = await Promise.all([
    User.countDocuments({}),
    GenesisWaitlist.countDocuments({}),
    Deposit.countDocuments({}),
  ]);

  console.log("MongoDB connected.");
  console.log(`Database: ${mongoose.connection.name}`);
  console.log(`Users: ${users}`);
  console.log(`Waitlist entries: ${waitlist}`);
  console.log(`Deposits: ${deposits}`);

  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error("DB check failed:", error.message);
  try {
    await mongoose.disconnect();
  } catch (_error) {
    // no-op
  }
  process.exit(1);
});
