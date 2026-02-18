const mongoose = require("mongoose");
const Deposit = require("./models/Deposit");
const Lock = require("./models/Lock");
const LedgerEntry = require("./models/LedgerEntry");
const { previewDeposit, confirmDeposit } = require("./services/depositService");
const { previewRelease, confirmRelease } = require("./services/releaseService");
const { checkMaturity } = require("./services/lockService");
const { previewUnlockSingle, confirmUnlockSingle } = require("./services/unlockService");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/delay";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const run = async () => {
  await mongoose.connect(MONGO_URI);

  if (process.env.RESET_DB === "true") {
    await Promise.all([
      Deposit.deleteMany({}),
      Lock.deleteMany({}),
      LedgerEntry.deleteMany({}),
    ]);
  }

  const userId = new mongoose.Types.ObjectId();
  console.log("Preview deposit (A)...");
  const previewA = await previewDeposit(userId, 500);
  console.log(previewA);

  console.log("Confirm deposit (A)...");
  const confirmA = await confirmDeposit(userId, 500, { allowMock: true });
  console.log({ depositId: confirmA.deposit._id, lockId: confirmA.lock._id });

  console.log("Preview early unlock (A)...");
  const unlockPreviewA = await previewUnlockSingle({
    userId,
    depositId: confirmA.deposit._id,
    useEmergency: true,
  });
  console.log(unlockPreviewA);

  console.log("Confirm early unlock (A)...");
  const unlockA = await confirmUnlockSingle({
    userId,
    depositId: confirmA.deposit._id,
    useEmergency: true,
    recipient: {
      name: "Test User",
      account_number: "0000000000",
      bank_code: "000",
    },
  });
  console.log(unlockA.release);

  console.log("Confirm deposit (B)...");
  const confirmB = await confirmDeposit(userId, 200, { allowMock: true });
  console.log({ depositId: confirmB.deposit._id, lockId: confirmB.lock._id });

  console.log("Waiting for maturity...");
  await delay(1200);
  await checkMaturity();

  console.log("Preview matured release (B)...");
  const releasePreviewB = await previewRelease(userId, confirmB.deposit._id);
  console.log(releasePreviewB);

  console.log("Confirm matured release (B)...");
  const releaseB = await confirmRelease(userId, confirmB.deposit._id);
  console.log(releaseB.release);

  const ledgerCount = await LedgerEntry.countDocuments();
  console.log("Ledger entries:", ledgerCount);

  await mongoose.disconnect();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

/**
 * FILE ROLE:
 * Local sanity script for exercising deposit, unlock, and release services.
 *
 * CONNECTS TO:
 * - services/depositService.js
 * - services/unlockService.js
 * - services/releaseService.js
 * - services/lockService.js
 * - models/Deposit, Lock, LedgerEntry
 *
 * USED BY:
 * - Manual developer testing (node backend/test.js)
 *
 * NOTES:
 * - Uses mock funding and mock payout details.
 * - Not part of automated test suite.
 */
