import { useEffect } from "react";

const DEFAULT_TITLE = "Nomad - Financial Discipline App in Nigeria";
const DEFAULT_DESCRIPTION =
  "Nomad helps Nigerians control impulsive spending with time-locked savings and behavioral friction.";

function upsertMeta(name, content, attribute = "name") {
  if (!content) return;
  let meta = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = "/images/nomad-hero-upload.png",
  jsonLd,
}) {
  useEffect(() => {
    document.title = title;

    upsertMeta("description", description);
    upsertMeta("og:type", "website", "property");
    upsertMeta("og:title", ogTitle || title, "property");
    upsertMeta("og:description", ogDescription || description, "property");
    upsertMeta("og:image", ogImage, "property");
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", ogTitle || title);
    upsertMeta("twitter:description", ogDescription || description);
    upsertMeta("twitter:image", ogImage);

    if (canonical) {
      let link = document.head.querySelector("link[rel='canonical']");
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    if (jsonLd) {
      let script = document.getElementById("nomad-jsonld");
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "nomad-jsonld";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }
  }, [canonical, description, jsonLd, ogDescription, ogImage, ogTitle, title]);

  return null;
}
