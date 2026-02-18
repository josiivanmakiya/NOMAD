import { Link } from "react-router-dom";

export default function WhyNomadPage() {
  return (
    <div className="min-h-screen bg-white px-5 py-8 font-mono text-[#0a0a0a] md:px-8">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="border border-slate-300 px-5 py-4 text-xs font-bold uppercase tracking-[0.16em]">
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/" className="text-slate-600 hover:text-black">
              Home
            </Link>
            <Link to="/why-nomad" className="text-black">
              Why Nomad
            </Link>
            <Link to="/rules" className="text-slate-600 hover:text-black">
              Rules
            </Link>
            <Link to="/login" className="text-slate-600 hover:text-black">
              Login
            </Link>
          </div>
        </header>

        <section className="border border-slate-300 p-6">
          <h1 className="text-3xl font-bold tracking-tight text-[#1f7a3f] md:text-4xl">Why Nomad</h1>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Nomad is a closed-loop discipline protocol. It is not a bank. It is built to preserve
            capital by removing immediate access during impulse windows.
          </p>
        </section>

        <section className="border border-slate-300 p-6">
          <h2 className="text-lg font-bold text-[#1f7a3f]">The Core Logic</h2>
          <p className="mt-2 text-sm text-slate-700">1. Lock funds by duration.</p>
          <p className="text-sm text-slate-700">2. New deposits reset active timers.</p>
          <p className="text-sm text-slate-700">3. Early access applies friction fee and reset.</p>
          <p className="text-sm text-slate-700">
            4. Funds return only to your verified source account.
          </p>
        </section>

        <section className="border border-slate-300 p-6">
          <h2 className="text-lg font-bold text-[#1f7a3f]">The Math</h2>
          <p className="mt-2 text-sm text-slate-700">Daily leak: ₦4,000 / $30</p>
          <p className="text-sm text-slate-700">Annual leak: ₦1,440,000 / $10,800</p>
          <p className="text-sm text-slate-700">
            The goal is retention first. Preserved principal outperforms interest on a leaking balance.
          </p>
        </section>

        <section className="border border-slate-300 p-6">
          <h2 className="text-lg font-bold text-[#1f7a3f]">What Nomad Includes</h2>
          <p className="mt-2 text-sm text-slate-700">The Protocol: deterministic lock rules.</p>
          <p className="text-sm text-slate-700">Values: economics of discipline and opportunity cost.</p>
          <p className="text-sm text-slate-700">Tax Efficiency: tax provisioning and liability firewall.</p>
          <p className="text-sm text-slate-700">Dynasty: age-triggered legacy transfer flow.</p>
          <p className="text-sm text-slate-700">Nomad Card (in development): subscription firewall.</p>
          <p className="text-sm text-slate-700">Nomad Insight: read-only behavioral guidance.</p>
        </section>

        <section className="border border-slate-300 p-6">
          <h2 className="text-lg font-bold text-[#1f7a3f]">Access</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              className="border border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white"
              to="/signup"
            >
              Enter Nomad
            </Link>
            <Link
              className="border border-slate-400 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-black"
              to="/genesis"
            >
              Join Waitlist
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
