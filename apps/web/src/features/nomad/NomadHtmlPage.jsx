import { useEffect, useState } from "react";
import HtmlPage from "../../components/HtmlPage.jsx";
import NomadNav from "../../components/NomadNav.jsx";

export default function NomadHtmlPage({ path }) {
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;
    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${path}`);
        return res.text();
      })
      .then((text) => {
        if (isActive) setHtml(text);
      })
      .catch((err) => {
        if (isActive) setError(err.message || "Failed to load page.");
      });
    return () => {
      isActive = false;
    };
  }, [path]);

  if (error) {
    return (
      <div className="page">
        <p className="hint">{error}</p>
      </div>
    );
  }

  if (!html) {
    return (
      <div className="page">
        <p className="hint">Loading…</p>
      </div>
    );
  }

  return (
    <>
      <NomadNav />
      <div style={{ paddingTop: 60 }}>
        <HtmlPage html={html} />
      </div>
    </>
  );
}
