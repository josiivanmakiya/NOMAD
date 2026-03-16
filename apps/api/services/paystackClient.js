const https = require("https");

const PAYSTACK_BASE_URL = "https://api.paystack.co";

const getSecretKey = () => {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new Error("PAYSTACK_SECRET_KEY is not set.");
  }
  return key;
};

const request = (method, path, body) =>
  new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;

    const options = {
      method,
      headers: {
        Authorization: `Bearer ${getSecretKey()}`,
        "Content-Type": "application/json",
      },
    };

    if (payload) {
      options.headers["Content-Length"] = Buffer.byteLength(payload);
    }

    const req = https.request(`${PAYSTACK_BASE_URL}${path}`, options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        let parsed;
        try {
          parsed = data ? JSON.parse(data) : {};
        } catch (err) {
          return reject(new Error("Paystack response JSON parse failed."));
        }

        if (!parsed || parsed.status !== true) {
          const message = (parsed && parsed.message) || "Paystack request failed.";
          return reject(new Error(message));
        }

        return resolve(parsed);
      });
    });

    req.on("error", (err) => reject(err));
    if (payload) req.write(payload);
    req.end();
  });

module.exports = {
  request,
};

/**
 * FILE ROLE:
 * Low-level HTTP client for Paystack API requests.
 *
 * CONNECTS TO:
 * - axios (HTTP)
 * - ENV PAYSTACK_SECRET_KEY
 *
 * USED BY:
 * - services/paystack*Service.js
 *
 * NOTES:
 * - Centralizes Paystack auth headers and error handling.
 */
