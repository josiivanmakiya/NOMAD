export default function SettingsSection({ title, description, children }) {
  return (
    <div className="settingsSection">
      <div className="settingsSectionHeader">
        <p className="label">{title}</p>
        {description ? <p className="hint">{description}</p> : null}
      </div>
      <div className="settingsList">{children}</div>
    </div>
  );
}

/**
 * FILE ROLE:
 * Minimal settings section wrapper.
 */
