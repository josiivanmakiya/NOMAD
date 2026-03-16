import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDisciplineProfile, getDisciplineTiers } from "../../api";
import NomadShell from "../../components/NomadShell.jsx";

const TIER_ORDER = ["Seedling", "Sapling", "Forest", "Sovereign"];

const TIER_DESCRIPTIONS = {
  Seedling:  { pts: 0,    next: "Sapling",   reward: "Tracking begins. Every action counts." },
  Sapling:   { pts: 50,   next: "Forest",    reward: "Micro-loan preview unlocked." },
  Trusted:   { pts: 150,  next: "Proven",    reward: "Visible to partner lenders." },
  Proven:    { pts: 350,  next: "Forest",    reward: "Community pool access." },
  Forest:    { pts: 300,  next: "Sovereign", reward: "Community pool access." },
  Sovereign: { pts: 1000, next: null,        reward: "Full lender access. Maximum opportunity." },
};

const formatAction = (action) => {
  if (!action) return "—";
  return action.replace(/_/g, " ").toLowerCase().replace(/^\w/, c => c.toUpperCase());
};

export default function ScorePage() {
  const [profile, setProfile] = useState(null);
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    Promise.all([
      getDisciplineProfile().catch(() => null),
      getDisciplineTiers().catch(() => null),
    ]).then(([profileData, tiersData]) => {
      if (!active) return;
      setProfile(profileData?.profile || null);
      setTiers(tiersData?.tiers || []);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  const currentPoints = Number(profile?.currentPoints || 0);
  const nextTierPts   = Number(profile?.nextTier?.pointsRequired || 0);
  const ptsToNext     = Number(profile?.pointsToNextTier || 0);
  const streakDays    = Number(profile?.currentStreakDays || 0);
  const tier          = profile?.disciplineTier || "Seedling";
  const nextTier      = profile?.nextTier?.tier || null;
  const logs          = profile?.recentLogs || [];
  const progressPct   = nextTierPts > 0 ? Math.min((currentPoints / nextTierPts) * 100, 100) : 100;
  const tierDesc      = TIER_DESCRIPTIONS[tier] || TIER_DESCRIPTIONS["Seedling"];

  return (
    <NomadShell title="SCORE" sub={`${tier} · ${currentPoints} pts`}>
      <style>{`
        .sc-hero{border:1px solid var(--border);padding:40px;margin-bottom:32px;display:grid;grid-template-columns:1fr auto;align-items:center;gap:32px;}
        .sc-tier-name{font-family:'Instrument Serif',serif;font-style:italic;font-size:clamp(36px,5vw,64px);color:var(--white);line-height:1;margin-bottom:8px;}
        .sc-tier-reward{font-size:10px;letter-spacing:2px;color:var(--green);text-transform:uppercase;font-weight:800;}
        .sc-pts-big{font-family:'Bebas Neue',sans-serif;font-size:clamp(64px,8vw,96px);color:var(--green);line-height:1;letter-spacing:2px;text-align:right;}
        .sc-pts-label{font-size:9px;letter-spacing:4px;color:var(--mid);text-transform:uppercase;font-weight:800;text-align:right;}
        .sc-progress-wrap{margin-top:24px;grid-column:1/-1;}
        .sc-progress-labels{display:flex;justify-content:space-between;font-size:9px;color:var(--mid);letter-spacing:2px;font-weight:800;margin-bottom:8px;}
        .sc-progress-track{height:3px;background:var(--border-light);}
        .sc-progress-fill{height:100%;background:var(--green);transition:width 1s ease;}
        .sc-progress-sub{font-size:9px;color:var(--mid);letter-spacing:1px;margin-top:8px;font-weight:600;}
        .sc-streak{border:1px solid rgba(29,185,84,0.2);padding:24px 32px;margin-bottom:32px;display:flex;align-items:center;justify-content:space-between;background:rgba(29,185,84,0.03);}
        .sc-streak-num{font-family:'Bebas Neue',sans-serif;font-size:56px;color:var(--green);letter-spacing:2px;line-height:1;}
        .sc-streak-label{font-size:9px;letter-spacing:4px;color:var(--green);text-transform:uppercase;font-weight:800;margin-top:4px;}
        .sc-streak-desc{font-size:11px;color:var(--mid);letter-spacing:1px;line-height:1.7;font-weight:600;max-width:360px;}
        .sc-tiers{border:1px solid var(--border);border-bottom:none;margin-bottom:32px;}
        .sc-tier-row{display:grid;grid-template-columns:120px 60px 1fr auto;align-items:center;gap:20px;padding:16px 24px;border-bottom:1px solid var(--border);transition:background 0.15s;}
        .sc-tier-row.current{background:rgba(242,237,232,0.03);}
        .sc-tier-row-name{font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:800;}
        .sc-tier-row-pts{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:1px;}
        .sc-tier-row-reward{font-size:9px;color:var(--mid);letter-spacing:1px;font-weight:600;}
        .sc-tier-badge{font-size:8px;letter-spacing:3px;text-transform:uppercase;font-weight:800;padding:4px 10px;border:1px solid;}
        .sc-tier-badge.current{color:var(--green);border-color:rgba(29,185,84,0.4);}
        .sc-tier-badge.locked{color:var(--mid);border-color:var(--border);}
        .sc-tier-badge.done{color:var(--mid);border-color:var(--border);opacity:0.4;}
        .sc-log{border:1px solid var(--border);border-bottom:none;margin-bottom:32px;}
        .sc-log-row{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid var(--border);gap:16px;}
        .sc-log-action{font-size:10px;color:var(--white);letter-spacing:1px;font-weight:700;flex:1;}
        .sc-log-pts{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:1px;white-space:nowrap;}
        .sc-log-pts.pos{color:var(--green);}
        .sc-log-pts.neg{color:var(--red);}
        .sc-empty{padding:32px 24px;font-size:10px;color:var(--mid);letter-spacing:3px;text-transform:uppercase;border:1px solid var(--border);border-top:none;}
        .sc-access{border:1px solid var(--border);padding:32px;margin-bottom:32px;}
        .sc-access-title{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:2px;color:var(--white);margin-bottom:8px;}
        .sc-access-desc{font-size:10px;color:var(--mid);letter-spacing:1px;line-height:1.8;font-weight:600;margin-bottom:20px;}
        .sc-access-row{display:flex;align-items:center;gap:12px;padding:14px 0;border-top:1px solid var(--border);}
        .sc-access-name{font-size:11px;letter-spacing:2px;font-weight:800;flex:1;}
        .sc-access-req{font-size:9px;letter-spacing:2px;font-weight:600;opacity:0.6;}
        @media(max-width:768px){.sc-hero{grid-template-columns:1fr;}.sc-pts-big,.sc-pts-label{text-align:left;}.sc-tier-row{grid-template-columns:1fr auto;}}
      `}</style>

      {/* HERO */}
      <div className="sc-hero">
        <div>
          <div className="sc-tier-name">{loading ? "—" : tier}</div>
          <div className="sc-tier-reward">{tierDesc.reward}</div>
        </div>
        <div>
          <div className="sc-pts-big">{loading ? "—" : currentPoints}</div>
          <div className="sc-pts-label">Points</div>
        </div>
        <div className="sc-progress-wrap">
          <div className="sc-progress-labels">
            <span>{tier} ({currentPoints})</span>
            {nextTier ? <span>{ptsToNext} pts to {nextTier}</span> : <span>Maximum tier reached</span>}
            {nextTier && <span>{nextTier} ({nextTierPts})</span>}
          </div>
          <div className="sc-progress-track">
            <div className="sc-progress-fill" style={{width:`${progressPct}%`}}/>
          </div>
          {nextTier && (
            <div className="sc-progress-sub">{ptsToNext} more points unlocks {nextTier} access</div>
          )}
        </div>
      </div>

      {/* STREAK */}
      <div className="sc-streak">
        <div>
          <div className="sc-streak-num">{streakDays}</div>
          <div className="sc-streak-label">Day streak</div>
        </div>
        <div className="sc-streak-desc">
          Every day without breaching a lock extends your streak.
          Streaks are the fastest way to climb tiers.
          Don't break the chain.
        </div>
      </div>

      {/* TIER LADDER */}
      <div className="ns-section-header">
        <div className="ns-section-title">Tier Ladder</div>
      </div>
      <div className="sc-tiers">
        {(tiers.length > 0 ? tiers : Object.entries(TIER_DESCRIPTIONS).map(([name, t]) => ({
          tier: name, pointsRequired: t.pts, reward: t.reward
        }))).map(t => {
          const isCurrent = t.tier === tier;
          const isDone = TIER_ORDER.indexOf(t.tier) < TIER_ORDER.indexOf(tier);
          return (
            <div className={`sc-tier-row${isCurrent ? " current" : ""}`} key={t.tier}>
              <div className="sc-tier-row-name" style={{color: isCurrent ? "var(--white)" : "var(--mid)"}}>
                {t.tier}
              </div>
              <div className="sc-tier-row-pts" style={{color: isCurrent ? "var(--green)" : "var(--mid)"}}>
                {t.pointsRequired}
              </div>
              <div className="sc-tier-row-reward">{t.reward || t.description || "—"}</div>
              <div className={`sc-tier-badge ${isCurrent ? "current" : isDone ? "done" : "locked"}`}>
                {isCurrent ? "Current" : isDone ? "Passed" : "Locked"}
              </div>
            </div>
          );
        })}
      </div>

      {/* SCORE LOG */}
      <div className="ns-section-header">
        <div className="ns-section-title">Score History</div>
      </div>
      <div className="sc-log">
        {loading ? (
          <div className="sc-empty">Loading score history...</div>
        ) : logs.length === 0 ? (
          <div className="sc-empty">No score events yet — first lock maturity starts your record</div>
        ) : logs.map(log => (
          <div className="sc-log-row" key={log._id}>
            <div className="sc-log-action">{formatAction(log.action)}</div>
            <div className={`sc-log-pts ${log.points >= 0 ? "pos" : "neg"}`}>
              {log.points > 0 ? "+" : ""}{log.points}
            </div>
          </div>
        ))}
      </div>

      {/* PARTNER ACCESS */}
      <div className="sc-access">
        <div className="sc-access-title">What Your Score Unlocks</div>
        <div className="sc-access-desc">
          Your discipline score is your financial identity.<br/>
          The higher it climbs, the more the ecosystem opens up.
        </div>
        {[
          { name: "FairMoney — Reduced rate loans",  req: "Sapling",   pts: 50   },
          { name: "Micro-investment access",          req: "Forest",    pts: 300  },
          { name: "Community savings pool",           req: "Forest",    pts: 300  },
          { name: "Premium lender marketplace",       req: "Sovereign", pts: 1000 },
        ].map(item => {
          const unlocked = currentPoints >= item.pts;
          return (
            <div className="sc-access-row" key={item.name}>
              <div style={{width:"8px",height:"8px",borderRadius:"50%",background: unlocked ? "var(--green)" : "var(--border-light)",flexShrink:0}}/>
              <div className="sc-access-name" style={{color: unlocked ? "var(--white)" : "var(--mid)"}}>
                {item.name}
              </div>
              <div className="sc-access-req">
                {unlocked ? "Unlocked" : `${item.req} · ${item.pts} pts`}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="ns-action-strip">
        <div>
          <div className="ns-action-text">Every lock you honor moves the score.</div>
          <div className="ns-action-text"><em>Behavior is the only currency that matters here.</em></div>
        </div>
        <button className="ns-action-btn" onClick={() => navigate("/app/deposit")}>+ New Lock</button>
      </div>

    </NomadShell>
  );
}
