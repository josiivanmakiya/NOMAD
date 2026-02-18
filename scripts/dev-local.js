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
      if (code === 0) {
        resolve();
        return;
      }
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
  console.log("Checking MongoDB connection first...");
  await run("npm", ["run", "db:check", "--prefix", "backend"], "db");
  console.log("DB check passed. Starting backend + frontend...");

  const backend = spawnLongRunning("npm", ["run", "dev", "--prefix", "backend"], "backend");
  const frontend = spawnLongRunning("npm", ["run", "dev", "--prefix", "frontend"], "frontend");

  const shutdown = (signal = "SIGTERM") => {
    if (!backend.killed) backend.kill(signal);
    if (!frontend.killed) frontend.kill(signal);
  };

  process.on("SIGINT", () => {
    shutdown("SIGINT");
    process.exit(0);
  });
  process.on("SIGTERM", () => {
    shutdown("SIGTERM");
    process.exit(0);
  });

  backend.on("close", (code) => {
    console.error(`backend exited (${code}). Stopping frontend.`);
    shutdown();
    process.exit(code || 1);
  });

  frontend.on("close", (code) => {
    console.error(`frontend exited (${code}). Stopping backend.`);
    shutdown();
    process.exit(code || 1);
  });
};

main().catch((error) => {
  console.error("Startup failed:", error.message);
  process.exit(1);
});
