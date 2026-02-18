import { Link } from "react-router-dom";

export default function SettingsItem({ title, description, to }) {
  return (
    <Link className="settingsItem" to={to}>
      <div>
        <p className="settingsItemTitle">{title}</p>
        {description ? <p className="hint">{description}</p> : null}
      </div>
      <span className="settingsChevron">›</span>
    </Link>
  );
}

/**
 * FILE ROLE:
 * Single settings row link.
 */
