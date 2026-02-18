import { useState } from "react";
import { publicNomadChat } from "../api.js";

export default function PublicInsightPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "NOMAD Insight (Public). Ask normal finance questions: budgeting, savings, debt control, emergency funds, and discipline.",
    },
  ]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const message = input.trim();
    if (!message || loading) {
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setLoading(true);
    try {
      const response = await publicNomadChat({ message });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.reply || "No reply available." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: error.message || "Chat failed. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-5 py-8 font-mono text-[#0a0a0a] md:px-8">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <section className="border border-slate-300 p-6">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            NOMAD Insight
          </h1>
          <p className="mt-2 text-sm text-slate-700">
            Public finance chatbot. In-app Insight remains available after login.
          </p>
        </section>

        <section className="insightQuoteBand">
          <blockquote>Your Own AI Advisor</blockquote>
        </section>

        <section className="border border-slate-300 p-6">
          <div className="max-h-[420px] space-y-3 overflow-y-auto border border-slate-300 bg-slate-50 p-4">
            {messages.map((item, index) => (
              <div key={`${item.role}-${index}`} className="text-sm">
                <span className="font-bold uppercase tracking-[0.14em] text-slate-500">
                  {item.role === "user" ? "You" : "Insight"}
                </span>
                <p className="mt-1 text-slate-800">{item.content}</p>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="mt-4 flex flex-col gap-3 md:flex-row">
            <input
              className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-black"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a finance question..."
            />
            <button
              className="border border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
