export default function ContactPage() {
  return (
    <div className="page">
      <div className="card">
        <p className="label">Contact</p>
        <div className="authForm">
          <p className="settingsItemTitle">Offices</p>
          <p className="hint">United States</p>
          <p className="hint">[Street Address]</p>
          <p className="hint">[City, State, ZIP]</p>
          <p className="hint">Nigeria</p>
          <p className="hint">[Street Address]</p>
          <p className="hint">[City, State]</p>
        </div>
      </div>

      <div className="card">
        <p className="label">Support</p>
        <div className="authForm">
          <p className="settingsItemTitle">Email</p>
          <p className="hint">support@nomad.app</p>
          <p className="settingsItemTitle">Phone</p>
          <p className="hint">+1 XXX XXX XXXX</p>
          <p className="hint">+234 XXX XXX XXXX</p>
        </div>
      </div>
    </div>
  );
}

