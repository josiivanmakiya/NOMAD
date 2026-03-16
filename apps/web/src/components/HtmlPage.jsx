import { useEffect, useMemo, useRef } from "react";

const DEFAULT_LINK_MAP = [
  ["nomad-landing.html", "/"],
  ["nomad-rules.html", "/rules"],
  ["nomad-roadmap.html", "/roadmap"],
  ["nomad-dynasty.html", "/dynasty"],
  ["nomad-about.html", "/why-nomad"],
  ["nomad-dashboard.html", "/app"],
  ["nomad-insight.html", "/insight"],
];

const extractBlocks = (html) => {
  const styleMatches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
  const styles = styleMatches.map((m) => m[1]).join("\n");
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;
  const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  return { styles, body, scripts };
};

const stripScripts = (body) => body.replace(/<script[\s\S]*?<\/script>/gi, "");

const normalizeLinks = (body, linkMap) => {
  let output = body;
  linkMap.forEach(([from, to]) => {
    const pattern = new RegExp(from.replace(/\./g, "\\."), "g");
    output = output.replace(pattern, to);
  });
  return output;
};

const runScripts = (scripts) => {
  scripts.forEach((code) => {
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(code);
      fn();
    } catch (error) {
      console.error("Inline script error:", error);
    }
  });
};

const waitForElements = (ids, callback, retries = 20, delay = 100) => {
  const allFound = ids.every((id) => document.getElementById(id));
  if (allFound) {
    callback();
    return;
  }
  if (retries <= 0) {
    console.warn("HtmlPage: could not find elements after retries:", ids);
    callback();
    return;
  }
  setTimeout(() => waitForElements(ids, callback, retries - 1, delay), delay);
};

export default function HtmlPage({ html, linkMap = DEFAULT_LINK_MAP }) {
  const hasRun = useRef(false);
  const containerRef = useRef(null);

  const { styles, body, scripts } = useMemo(() => extractBlocks(html), [html]);
  const normalizedBody = useMemo(
    () => stripScripts(normalizeLinks(body, linkMap)),
    [body, linkMap]
  );

  useEffect(() => {
    if (hasRun.current) return;
    if (!scripts.length) return;

    // Wait for key calculator elements to exist in DOM before running scripts
    const watchIds = ["age", "startAge", "dailyLeak", "r-lost", "r-ghost", "verdict", "swing-val"];
    const knownIds = watchIds.filter((id) =>
      normalizedBody.includes(`id="${id}"`) || normalizedBody.includes(`id='${id}'`)
    );

    if (knownIds.length > 0) {
      waitForElements(knownIds, () => {
        hasRun.current = true;
        runScripts(scripts);
      });
    } else {
      setTimeout(() => {
        hasRun.current = true;
        runScripts(scripts);
      }, 200);
    }
  }, [scripts, normalizedBody]);

  return (
    <div className="nomad-html-page" ref={containerRef}>
      <style>{`
        .nomad-html-page {
          background: #070707;
          color: #f5f2eb;
          font-weight: 500;
        }
        .nomad-html-page h1,
        .nomad-html-page h2,
        .nomad-html-page h3,
        .nomad-html-page h4,
        .nomad-html-page h5,
        .nomad-html-page h6 {
          color: #ffffff;
          font-weight: 700;
        }
        .nomad-html-page p,
        .nomad-html-page li,
        .nomad-html-page label,
        .nomad-html-page span {
          color: rgba(245, 242, 235, 0.88);
        }
        .nomad-html-page a {
          color: rgba(245, 242, 235, 0.88);
          text-decoration: none;
        }
        .nomad-html-page input,
        .nomad-html-page select {
          color: #ffffff;
          background: #0a0a0a;
        }
      `}</style>
      {styles ? <style>{styles}</style> : null}
      <div dangerouslySetInnerHTML={{ __html: normalizedBody }} />
    </div>
  );
}
