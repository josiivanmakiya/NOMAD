const isBannerEnabled = () => {
  const flag = String(import.meta.env.VITE_DEV_USER_BANNER || "").toLowerCase();
  if (flag === "true") return true;
  if (flag === "false") return false;
  return import.meta.env.DEV;
};

export default function DevSessionBanner() {
  if (!isBannerEnabled()) {
    return null;
  }

  return (
    <div className="devBanner" role="status" aria-live="polite">
      <span className="devBannerTag">DEV SESSION</span>
      <span className="devBannerText">
        Local development mode.
      </span>
    </div>
  );
}
