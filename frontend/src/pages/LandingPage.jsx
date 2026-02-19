import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import VatWhtCalculatorCard from "../components/VatWhtCalculatorCard.jsx";
import Seo from "../components/Seo.jsx";
import { joinGenesisWaitlist } from "../api.js";
import { GENESIS_TEXT } from "../content/genesisText.js";
import { ENABLE_PUBLIC_AUTH_ROUTES } from "../config/featureFlags.js";
import whyNavImage1 from "../../images/Screenshot 2026-02-17 221911.png";
import whyNavImage2 from "../../images/Screenshot 2026-02-17 222045.png";
import solutionsNavImage1 from "../../images/Screenshot 2026-02-17 222146.png";
import solutionsNavImage3 from "../../images/Screenshot 2026-02-17 222425.png";
import solutionsNavImage4 from "../../images/Screenshot 2026-02-17 222218.png";
import heroImage from "../../images/Screenshot 2026-02-15 230143.png";
import problemImage from "../../images/the problem.png";
import benefitsImage from "../../images/Screenshot 2026-02-17 223311.png";
import futureImage from "../../images/Screenshot 2026-02-17 223401.png";
import cardsBackdropImage from "../../images/Screenshot 2026-02-17 222538.png";

const toClock = (secondsLeft) => {
  const safe = Math.max(secondsLeft, 0);
  const hours = String(Math.floor(safe / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((safe % 3600) / 60)).padStart(2, "0");
  const seconds = String(safe % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export default function LandingPage() {
  const [activeNavMenu, setActiveNavMenu] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(24 * 60 * 60);
  const [waitlistForm, setWaitlistForm] = useState({
    email: "",
    phoneNumber: "",
    biggestLeak: "Impulse spending",
    leakRange: "₦1,000 - ₦5,000",
    tenYearGoal: "Home Ownership",
    customTenYearGoal: "",
    automation: "high_protocol",
    resetConsent: true,
  });
  const [waitlistStatus, setWaitlistStatus] = useState("");
  const [submittingWaitlist, setSubmittingWaitlist] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 24 * 60 * 60 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("navMenuOpen", Boolean(activeNavMenu));
    return () => {
      document.body.classList.remove("navMenuOpen");
    };
  }, [activeNavMenu]);

  useEffect(() => {
    const onPointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      const inHeader = target.closest(".landingV2Header");
      if (!inHeader) {
        setActiveNavMenu(null);
      }
    };
    const onEsc = (event) => {
      if (event.key === "Escape") {
        setActiveNavMenu(null);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const countdown = useMemo(() => toClock(secondsLeft), [secondsLeft]);

  const submitWaitlist = async (event) => {
    event.preventDefault();
    setWaitlistStatus("");
    setSubmittingWaitlist(true);
    try {
      const normalizedTenYearGoal =
        waitlistForm.tenYearGoal === "Other"
          ? waitlistForm.customTenYearGoal.trim()
          : waitlistForm.tenYearGoal;
      const response = await joinGenesisWaitlist({
        ...waitlistForm,
        tenYearGoal: normalizedTenYearGoal,
      });
      setWaitlistStatus(response.message || "You are on the waitlist.");
      setWaitlistForm((prev) => ({
        ...prev,
        email: "",
        phoneNumber: "",
        customTenYearGoal: "",
      }));
    } catch (error) {
      setWaitlistStatus(error.message || "Could not join waitlist.");
    } finally {
      setSubmittingWaitlist(false);
    }
  };

  return (
    <div className="landingV2">
      <Seo
        title="Nomad - Financial Discipline App in Nigeria | Control Spending & Lock Savings"
        description="Nomad helps you control impulsive spending with time-locked savings and behavioral friction. Build real financial discipline in Nigeria."
        canonical="https://nomadapp.co/"
        ogTitle="Nomad - The Financial Discipline App"
        ogDescription="Control spending. Lock savings. Build real discipline."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: "Nomad",
          url: "https://nomadapp.co",
          description:
            "A financial discipline app that helps users control spending using time-locked deposits.",
          areaServed: "NG",
        }}
      />
      <header className="landingV2Header">
        <div className="landingV2HeaderInner">
          <div className="landingV2Brand">
            <img
              src="/images/nomad-hero.svg"
              alt="NOMAD logo"
              className="landingV2Logo"
              width="48"
              height="48"
            />
            <span className="landingV2BrandText">NOMAD</span>
          </div>
          <nav className="landingV2Nav desktop-menu">
            <ul className="landingV2NavList">
              <li
                className={`nav__item nav__item--parent ${activeNavMenu === "why" ? "submenuOpen" : ""}`}
                onMouseEnter={() => setActiveNavMenu("why")}
              >
                <a className="nav__link" href="#problem">Why Nomad</a>
                <ul className="submenu mb4">
                  <li>
                    <p className="landingV2SubHead">The Problem</p>
                    <p className="landingV2SubText">You do not have a spending problem. You have an access problem.</p>
                    <a className="landingV2Continue" href="#problem">Continue reading</a>
                    <div className="landingV2SubMedia">
                      <img
                        src={whyNavImage1}
                        alt="Why Nomad problem visual"
                        loading="lazy"
                        decoding="async"
                        width="480"
                        height="320"
                      />
                    </div>
                  </li>
                  <li>
                    <p className="landingV2SubHead">The Mechanism</p>
                    <p className="landingV2SubText">Friction is the space between impulse and regret.</p>
                    <a className="landingV2Continue" href="#mechanism">Continue reading</a>
                    <div className="landingV2SubMedia">
                      <img
                        src={whyNavImage2}
                        alt="Why Nomad mechanism visual"
                        loading="lazy"
                        decoding="async"
                        width="480"
                        height="320"
                      />
                    </div>
                  </li>
                </ul>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/insight">Nomad Insight AI</Link>
              </li>
              <li
                className={`nav__item nav__item--parent ${activeNavMenu === "solutions" ? "submenuOpen" : ""}`}
                onMouseEnter={() => setActiveNavMenu("solutions")}
              >
                <a className="nav__link" href="#mechanism">Solutions</a>
                <ul className="submenu mb4">
                  <li>
                    <p className="landingV2SubHead">Protocol</p>
                    <p className="landingV2SubText">Full architecture and operating logic.</p>
                    <Link className="landingV2Continue" to="/protocol">Continue reading</Link>
                    <div className="landingV2SubMedia">
                      <img
                        src={solutionsNavImage1}
                        alt="Protocol visual"
                        loading="lazy"
                        decoding="async"
                        width="480"
                        height="320"
                      />
                    </div>
                  </li>
                  <li>
                    <p className="landingV2SubHead">Rules</p>
                    <p className="landingV2SubText">Lock durations, reset logic, and constraints.</p>
                    <Link className="landingV2Continue" to="/rules">Continue reading</Link>
                  </li>
                  <li>
                    <p className="landingV2SubHead">Dynasty</p>
                    <p className="landingV2SubText">Legacy transfer flow with rule-based release and continuity logic.</p>
                    <Link className="landingV2Continue" to="/dynasty">Continue reading</Link>
                    <div className="landingV2SubMedia">
                      <img
                        src={solutionsNavImage4}
                        alt="Dynasty visual"
                        loading="lazy"
                        decoding="async"
                        width="480"
                        height="320"
                      />
                    </div>
                  </li>
                  <li>
                    <p className="landingV2SubHead">Roadmap</p>
                    <p className="landingV2SubText">Phase 1 to Phase 3 trajectory.</p>
                    <Link className="landingV2Continue" to="/roadmap">Continue reading</Link>
                    <div className="landingV2SubMedia">
                      <img
                        src={solutionsNavImage3}
                        alt="Roadmap visual"
                        loading="lazy"
                        decoding="async"
                        width="480"
                        height="320"
                      />
                    </div>
                  </li>
                </ul>
              </li>
              <li className="nav__item">
                <a className="nav__link landingV2WaitlistNavLink" href="#waitlist">Waitlist</a>
              </li>
            </ul>
          </nav>
          <div className="landingV2HeaderActions">
            <Link to="/genesis" className="landingV2ActionButton landingV2WaitlistAction">
              Join Waitlist
            </Link>
            {ENABLE_PUBLIC_AUTH_ROUTES ? (
              <>
                <Link to="/signup" className="landingV2ActionButton landingV2WaitlistAction">
                  Sign Up
                </Link>
                <Link to="/login" className="landingV2ActionButton landingV2WaitlistAction">
                  Login
                </Link>
              </>
            ) : (
              <>
                <span className="landingV2LoginDisabled" aria-disabled="true" title="Sign up is temporarily disabled">
                  Sign Up
                </span>
                <span className="landingV2LoginDisabled" aria-disabled="true" title="Login is temporarily disabled">
                  Login
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      <main
        onMouseEnter={() => setActiveNavMenu(null)}
        onFocusCapture={() => setActiveNavMenu(null)}
      >
        <section className="landingV2Hero">
          <div className="landingV2HeroInner">
            <p className="landingV2Eyebrow">Automate Your Discipline</p>
            <h1>Control your money before it controls you.</h1>
            <p className="landingV2Lead">
              Lock funds for time. Break impulse access. Build retained capital.
            </p>
            <p className="landingV2Lead">
              <span className="nomadWord landingLeadNomadWord">NOMAD</span> is your financial accountability partner.
            </p>
            <div className="landingV2ImageSlot">
              <h2 className="landingHeroImageHeadline">
                Take Back Your Wealth With <span className="landingHeroNomadWord">NOMAD</span>
              </h2>
              <img
                src={heroImage}
                alt="Nomad hero visual"
                className="landingSectionImage"
                width="1280"
                height="720"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section
          className="landingV2Section landingV2CardsSection"
          style={{ "--cards-bg-image": `url(${cardsBackdropImage})` }}
        >
          <div className="landingV2CardsGrid">
            <article className="landingV2Card">
              <p className="landingV2CardTitle">The Protocol</p>
              <p>Read full architecture, lock mechanics, and phase plan.</p>
              <Link to="/protocol" className="landingV2Continue">
                Continue reading
              </Link>
            </article>
            <article className="landingV2Card">
              <p className="landingV2CardTitle">Lock Rules</p>
              <p>See duration tiers, early unlock friction, and constraints.</p>
              <Link to="/rules" className="landingV2Continue">
                Continue reading
              </Link>
            </article>
            <article className="landingV2Card">
              <p className="landingV2CardTitle">Roadmap</p>
              <p>Track Phase 1 preservation and Phase 2 deployment rails.</p>
              <Link to="/roadmap" className="landingV2Continue">
                Continue reading
              </Link>
            </article>
          </div>
        </section>

        <section id="problem" className="landingV2Section landingV2Split">
          <div className="landingV2SplitText">
            <h2>The Problem</h2>
            <p>You do not have a spending problem. You have an access problem.</p>
            <p>Fast access creates fast leakage. Nomad removes instant access where impulse wins.</p>
            <div className="landingV2MetricRow">
              <div className="landingV2Metric">
                <span>24-Hour Decision Window</span>
                <strong>{countdown}</strong>
              </div>
              <div className="landingV2Metric">
                <span>Leak Math</span>
                <strong>₦4,000/day</strong>
                <small>₦1,440,000 annual leak</small>
              </div>
            </div>
          </div>
          <div className="landingV2SplitImage">
            <img
              src={problemImage}
              alt="Problem section visual"
              className="landingSectionImage"
              loading="lazy"
              decoding="async"
              width="1280"
              height="720"
            />
          </div>
        </section>

        <section className="landingV2QuoteBand">
          <blockquote>
            “Friction is the space between impulse and regret.”
          </blockquote>
        </section>

        <section id="mechanism" className="landingV2Section">
          <div className="landingV2SectionHeader">
            <p className="landingV2Eyebrow">How Nomad Works</p>
            <h2>Discipline by structure, not motivation.</h2>
          </div>
          <div className="landingV2MechanismGrid">
            <article>
              <h3>1. Lock For Time</h3>
              <p>Deposits become time-locked. New deposits enforce protocol discipline.</p>
            </article>
            <article>
              <h3>2. Let Impulse Decay</h3>
              <p>Timer friction protects decisions until pressure drops and clarity returns.</p>
            </article>
            <article>
              <h3>3. Re-Enter With Intent</h3>
              <p>On maturity, release is intentional. If ignored, auto-relock can preserve momentum.</p>
            </article>
            <article>
              <h3>Core Value</h3>
              <p>Nomad protects your future self by turning discipline into retained capital.</p>
            </article>
          </div>
        </section>

        <section className="landingV2Section landingV2Split">
          <div className="landingV2SplitText">
            <h2>What You Get</h2>
            <p>Preservation: less leakage, more principal intact.</p>
            <p>Self-control by design: structure over willpower.</p>
            <p>Sovereignty: decisions made with time, not pressure.</p>
          </div>
          <div className="landingV2SplitImage">
            <img
              src={benefitsImage}
              alt="Benefits section visual"
              className="landingSectionImage"
              loading="lazy"
              decoding="async"
              width="1280"
              height="720"
            />
          </div>
        </section>

        <section className="landingV2Section">
          <VatWhtCalculatorCard
            title="VAT/WHT (VHT) Calculator"
            hint="Quick tax provisioning estimate for your inflow. Move liabilities into a lock before spending."
          />
        </section>

        <section id="future" className="landingV2Section landingV2FutureBand">
          <div
            className="landingV2FutureStory"
            style={{ "--future-bg-image": `url(${futureImage})` }}
          >
            <div className="landingV2FutureOverlay">
              <p className="landingV2Eyebrow">The Future (Phase 2)</p>
              <h2>From Cash to Assets.</h2>
              <p>Nomad is the gateway to the $16T RWA market.</p>
              <p>Preserve: Phase 1 (Cash)</p>
              <p>Deploy: Phase 2 (Land, Commodities, Export Bonds)</p>
              <p>Own: Phase 3 (Self-Sustaining Loops)</p>
            </div>
          </div>
        </section>

        <section id="waitlist" className="landingV2Section">
          <div className="landingV2SectionHeader">
            <p className="landingV2Eyebrow">Early Access</p>
            <h2>This is for people done being controlled by money.</h2>
          </div>
          <form onSubmit={submitWaitlist} className="landingV2WaitlistForm">
            <label>
              <span>Email</span>
              <input
                type="email"
                value={waitlistForm.email}
                onChange={(event) =>
                  setWaitlistForm((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              <span>Phone Number</span>
              <input
                value={waitlistForm.phoneNumber}
                onChange={(event) =>
                  setWaitlistForm((prev) => ({ ...prev, phoneNumber: event.target.value }))
                }
                placeholder="+234..."
                required
              />
            </label>
            <label>
              <span>What do you want to control?</span>
              <select
                value={waitlistForm.biggestLeak}
                onChange={(event) =>
                  setWaitlistForm((prev) => ({ ...prev, biggestLeak: event.target.value }))
                }
              >
                <option value="Impulse spending">Impulse spending</option>
                <option value="Betting">Betting</option>
                <option value="Shopping">Shopping</option>
                <option value="Saving consistently">Saving consistently</option>
                <option value="All of them">All of them</option>
              </select>
            </label>
            <label>
              <span>Leak Range</span>
              <select
                value={waitlistForm.leakRange}
                onChange={(event) =>
                  setWaitlistForm((prev) => ({ ...prev, leakRange: event.target.value }))
                }
              >
                <option value="₦1,000 - ₦5,000">₦1,000 - ₦5,000</option>
                <option value="₦10,000 - ₦50,000">₦10,000 - ₦50,000</option>
                <option value="More than ₦50,000">More than ₦50,000</option>
              </select>
            </label>
            <label>
              <span>10-Year Goal</span>
              <select
                value={waitlistForm.tenYearGoal}
                onChange={(event) =>
                  setWaitlistForm((prev) => ({ ...prev, tenYearGoal: event.target.value }))
                }
              >
                <option value="Home Ownership">Home Ownership</option>
                <option value="Land">Land</option>
                <option value="Business">Business</option>
                <option value="Education Fund">Education Fund</option>
                <option value="Retirement Capital">Retirement Capital</option>
                <option value="Other">Other</option>
              </select>
            </label>
            {waitlistForm.tenYearGoal === "Other" ? (
              <label className="landingV2WideField">
                <span>Custom 10-Year Goal</span>
                <input
                  value={waitlistForm.customTenYearGoal}
                  onChange={(event) =>
                    setWaitlistForm((prev) => ({
                      ...prev,
                      customTenYearGoal: event.target.value,
                    }))
                  }
                  placeholder="Type your long-term goal"
                  required
                />
              </label>
            ) : null}
            <div className="landingV2WideField landingV2AutomationGroup">
              <span className="landingV2AutomationTitle">{GENESIS_TEXT.labels.automation}</span>
              <div className="landingV2AutomationOptions">
                {GENESIS_TEXT.automationOptions.map((option) => (
                  <label key={option.value} className="landingV2AutomationOption">
                    <input
                      type="radio"
                      name="automation"
                      value={option.value}
                      checked={waitlistForm.automation === option.value}
                      onChange={(event) =>
                        setWaitlistForm((prev) => ({ ...prev, automation: event.target.value }))
                      }
                    />
                    <div>
                      <p className="landingV2AutomationOptionTitle">{option.label}</p>
                      <p className="landingV2AutomationOptionText">{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <label className="landingV2Consent">
              <input
                type="checkbox"
                checked={waitlistForm.resetConsent}
                onChange={(event) =>
                  setWaitlistForm((prev) => ({
                    ...prev,
                    resetConsent: event.target.checked,
                  }))
                }
              />
              <span>I accept the Reset Rule for this protocol.</span>
            </label>
            <div className="landingV2WaitlistActions">
              <button type="submit" disabled={submittingWaitlist}>
                {submittingWaitlist ? "Joining..." : "Join Waitlist"}
              </button>
              <Link to="/protocol">Read Full Protocol</Link>
            </div>
          </form>
          {waitlistStatus ? <p className="landingV2Status">{waitlistStatus}</p> : null}
        </section>

        <footer className="landingV2Footer">
          <div className="landingV2FooterColumn">
            <p className="landingV2FooterBrand">NOMAD</p>
            <p>Capital preservation infrastructure for disciplined operators.</p>
            <a href="mailto:help@nomad.app">help@nomad.app</a>
          </div>
          <div className="landingV2FooterColumn">
            <p className="landingV2FooterTitle">Read More</p>
            <Link to="/protocol">Protocol</Link>
            <Link to="/rules">Rules</Link>
            <Link to="/roadmap">Roadmap</Link>
            <Link to="/insight">Nomad Insight</Link>
          </div>
          <div className="landingV2FooterColumn">
            <p className="landingV2FooterTitle">Legal</p>
            <p>Terms and legal (in preparation)</p>
            <p>Security: verified-account-only transfer rules.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
