import { useState } from "react";
import { NOMAD_INSIGHT_GUIDE } from "../content/nomadInsightGuide.js";
import { publicNomadChat } from "../api.js";

export default function NomadChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `I am Nomad Insight (${NOMAD_INSIGHT_GUIDE.role}). Ask about discipline patterns, lock behavior, or friction cost.`,
    },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const data = await publicNomadChat({ message: input });
      const aiMessage = {
        role: "assistant",
        content: data.reply || "No response from NOMAD Insight.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const aiMessage = {
        role: "assistant",
        content: error.message || "NOMAD Insight is unavailable right now.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }
  };

  return (
    <div className="card terminalCard">
      <p className="label">NOMAD Insight</p>
      <div className="terminalLog">
        {messages.map((m, i) => (
          <div key={`${m.role}-${i}`} className="terminalLine">
            <span className="terminalRole">{m.role === "user" ? "USER>" : "GUIDE>"}</span>
            <span>{m.content}</span>
          </div>
        ))}
      </div>
      <form
        className="actions"
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
      >
        <input
          className="input terminalInput"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type query..."
        />
        <button className="primary terminalButton" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

/**
 * FILE ROLE:
 * NOMAD chat component backed by the backend public chat endpoint.
 */
