import { useEffect, useState } from "react";
import HtmlPage from "../../components/HtmlPage.jsx";

export default function LandingPage() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    let isMounted = true;
    fetch("/nomad/landing.html")
      .then((res) => res.text())
      .then((text) => {
        if (isMounted) setHtml(text);
      })
      .catch((error) => {
        console.error("Failed to load landing HTML:", error);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return <HtmlPage html={html} />;
}
