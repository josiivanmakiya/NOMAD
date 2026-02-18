export const UI_ACTION_MAP = {
  landing: [
    { action: "Enter Nomad", route: "/signup" },
    { action: "View Rules", route: "/rules" },
    { action: "Why Nomad Anchor", route: "/#whyNomad" },
  ],
  dashboard: [
    { action: "Initiate Deposit", route: "/app/deposit" },
    { action: "View All Locks", route: "/app/deposits" },
    { action: "Manage Funding Accounts", route: "/app/accounts" },
  ],
  deposits: [
    { action: "Preview Deposit", method: "POST", endpoint: "/api/deposits/preview" },
    { action: "Confirm Deposit", method: "POST", endpoint: "/api/deposits/confirm" },
    { action: "List Deposits", method: "GET", endpoint: "/api/deposits" },
    { action: "Deposit Detail", method: "GET", endpoint: "/api/deposits" },
  ],
  releaseAndUnlock: [
    {
      action: "Preview Mature Release",
      method: "GET",
      endpoint: "/api/releases/:depositId/preview",
    },
    {
      action: "Confirm Mature Release",
      method: "POST",
      endpoint: "/api/releases/:depositId/confirm",
    },
    {
      action: "Preview Early Unlock",
      method: "POST",
      endpoint: "/api/unlocks/preview",
    },
    {
      action: "Confirm Early Unlock",
      method: "POST",
      endpoint: "/api/unlocks/confirm",
    },
  ],
  accountRails: [
    { action: "List Accounts", method: "GET", endpoint: "/api/accounts" },
    { action: "Link Account", method: "POST", endpoint: "/api/accounts/link" },
    { action: "Delete Account", method: "DELETE", endpoint: "/api/accounts/:accountId" },
  ],
};

