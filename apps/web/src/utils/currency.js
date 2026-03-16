export const supportedCurrencies = ["NGN", "USD", "EUR", "GBP", "CAD"];
export const defaultCurrency = "NGN";

const localeByCurrency = {
  NGN: "en-NG",
  USD: "en-US",
  EUR: "en-IE",
  GBP: "en-GB",
  CAD: "en-CA",
};

export const formatCurrency = (value, currency = defaultCurrency) => {
  const locale = localeByCurrency[currency] || "en-NG";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
};

/**
 * FILE ROLE:
 * Currency formatting helpers and supported currency list.
 *
 * CONNECTS TO:
 * - Intl.NumberFormat (browser API)
 *
 * USED BY:
 * - pages/* (display formatting)
 * - state/CurrencyContext.jsx
 */
