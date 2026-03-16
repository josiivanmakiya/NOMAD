/* eslint-disable no-console */
const { spawn } = require("node:child_process");

const run = (command, args, label, options = {}) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ["inherit", "pipe", "pipe"],
      shell: true,
      ...options,
    });
    child.stdout.on("data", (chunk) => {
      process.stdout.write(`[${label}] ${chunk}`);
    });
    child.stderr.on("data", (chunk) => {
      process.stderr.write(`[${label}] ${chunk}`);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) { resolve(); return; }
      reject(new Error(`${label} exited with code ${code}`));
    });
  });

const spawnLongRunning = (command, args, label) => {
  const child = spawn(command, args, {
    stdio: ["inherit", "pipe", "pipe"],
    shell: true,
  });
  child.stdout.on("data", (chunk) => {
    process.stdout.write(`[${label}] ${chunk}`);
  });
  child.stderr.on("data", (chunk) => {
    process.stderr.write(`[${label}] ${chunk}`);
  });
  return child;
};

const main = async () => {
  console.log("Checking MongoDB connection...");
  await run("npm", ["run", "db:check", "--prefix", "apps/api"], "db");
  console.log("DB check passed. Starting api + web...");

  const api = spawnLongRunning("npm", ["run", "dev", "--prefix", "apps/api"], "api");
  const web = spawnLongRunning("npm", ["run", "dev", "--prefix", "apps/web"], "web");

  const shutdown = (signal = "SIGTERM") => {
    if (!api.killed) api.kill(signal);
    if (!web.killed) web.kill(signal);
  };

  process.on("SIGINT", () => { shutdown("SIGINT"); process.exit(0); });
  process.on("SIGTERM", () => { shutdown("SIGTERM"); process.exit(0); });

  api.on("close", (code) => {
    console.error(`api exited (${code}). Stopping web.`);
    shutdown();
    process.exit(code || 1);
  });

  web.on("close", (code) => {
    console.error(`web exited (${code}). Stopping api.`);
    shutdown();
    process.exit(code || 1);
  });
};

main().catch((error) => {
  console.error("Startup failed:", error.message);
  process.exit(1);
});
