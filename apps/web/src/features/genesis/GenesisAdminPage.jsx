import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  getFounderDashboardUsers,
  getFounderWaitlistEntries,
  getFounderWaitlistLogs,
} from "../../api";
import { ENABLE_FOUNDER_DASHBOARD } from "../../config/featureFlags.js";

export default function GenesisAdminPage() {
  const [rows, setRows] = useState([]);
  const [entries, setEntries] = useState([]);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("");

  if (!ENABLE_FOUNDER_DASHBOARD) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    getFounderDashboardUsers()
      .then((response) => setRows(response.users || []))
      .catch((error) => setStatus(error.message));

    getFounderWaitlistLogs(100)
      .then((response) => setLogs(response.logs || []))
      .catch(() => null);

    getFounderWaitlistEntries(200)
      .then((response) => setEntries(response.entries || []))
      .catch(() => null);
  }, []);

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h2 className="textTitle valuesHeading">Founder Dashboard</h2>
          <p className="pageSubtitle">
            Local founder view for Genesis waitlist + discipline metrics.
          </p>
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">Users</p>
        {status ? <p className="status">{status}</p> : null}
        <div className="valuesTable">
          <div className="valuesTableHeader">
            <p>Phone</p>
            <p>Status</p>
            <p>Preserved</p>
            <p>Rating</p>
            <p>Metrics</p>
          </div>
          {rows.length === 0 ? (
            <div className="valuesTableRow">
              <p>—</p>
              <p>—</p>
              <p>₦0</p>
              <p>—</p>
              <p>No Genesis users yet.</p>
            </div>
          ) : (
            rows.map((row) => (
              <div key={row.id} className="valuesTableRow">
                <p>{row.phoneNumber || "—"}</p>
                <p>{row.status}</p>
                <p>₦{Number(row.preservedCapital || 0).toLocaleString()}</p>
                <p>{row.disciplineRating}</p>
                <p>
                  T:{Number(row.metrics?.timerCheckCount || 0)} / F:
                  {Number(row.metrics?.failedUnlockAttempts || 0)} / R:
                  {Number(row.metrics?.totalResets || 0)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">Waitlist Entries</p>
        <div className="valuesTable">
          <div className="valuesTableHeader">
            <p>Time</p>
            <p>Email</p>
            <p>Phone</p>
            <p>Leak</p>
            <p>Range</p>
            <p>Goal</p>
            <p>Automation</p>
            <p>Status</p>
          </div>
          {entries.length === 0 ? (
            <div className="valuesTableRow">
              <p>—</p>
              <p>—</p>
              <p>—</p>
              <p>—</p>
              <p>—</p>
              <p>—</p>
              <p>—</p>
              <p>No waitlist entries yet.</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="valuesTableRow">
                <p>{entry.createdAt ? new Date(entry.createdAt).toLocaleString() : "—"}</p>
                <p>{entry.email || "—"}</p>
                <p>{entry.phoneNumber || "—"}</p>
                <p>{entry.biggestLeak || "—"}</p>
                <p>{entry.leakRange || "—"}</p>
                <p>{entry.tenYearGoal || "—"}</p>
                <p>{entry.automationMode || "—"}</p>
                <p>{entry.status || "—"}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card">
        <p className="label valuesHeading">Recent Waitlist Logs</p>
        <div className="valuesTable">
          <div className="valuesTableHeader">
            <p>Time</p>
            <p>Email</p>
            <p>Phone</p>
            <p>Outcome</p>
            <p>Error</p>
          </div>
          {logs.length === 0 ? (
            <div className="valuesTableRow">
              <p>—</p>
              <p>—</p>
              <p>—</p>
              <p>—</p>
              <p>No logs yet.</p>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="valuesTableRow">
                <p>{log.createdAt ? new Date(log.createdAt).toLocaleString() : "—"}</p>
                <p>{log.email || "—"}</p>
                <p>{log.phoneNumber || "—"}</p>
                <p>{log.outcome || "—"}</p>
                <p>{Array.isArray(log.errors) && log.errors[0] ? log.errors[0].message : "—"}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
