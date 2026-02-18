const parseBool = (value, fallback = false) => {
  if (value === undefined || value === null || value === "") return fallback;
  return String(value).toLowerCase() === "true";
};

// Founder dashboard is disabled by default and should only be enabled locally.
export const ENABLE_FOUNDER_DASHBOARD = parseBool(
  import.meta.env.VITE_ENABLE_FOUNDER_DASHBOARD,
  false
);

// Public auth routes can be disabled during waitlist-only launches.
export const ENABLE_PUBLIC_AUTH_ROUTES = parseBool(
  import.meta.env.VITE_ENABLE_PUBLIC_AUTH_ROUTES,
  true
);

export const FOUNDER_DASHBOARD_PATH =
  import.meta.env.VITE_FOUNDER_DASHBOARD_PATH || "/founder/local";

// Temporary dev bypass to keep app routes open while editing dashboard flows.
export const BYPASS_APP_AUTH_GUARD = parseBool(
  import.meta.env.VITE_BYPASS_APP_AUTH_GUARD,
  false
);

// Waitlist-only launch switch. When false, /app and /home are hidden.
export const ENABLE_APP_ROUTES = parseBool(
  import.meta.env.VITE_ENABLE_APP_ROUTES,
  true
);
