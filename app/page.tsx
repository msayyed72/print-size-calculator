"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./home.module.css";

const categories = [
  { name: "Images", icon: "◫", description: "Resize, compress, convert and understand your images.", tools: ["Print Size Calculator", "DPI Calculator", "Pixels to Inches", "Image Resolution Checker", "Image Format Converter", "Image Resizer", "Image Compressor", "Image Cropper"] },
  { name: "PDF & Documents", icon: "▤", description: "Turn text into documents and keep simple file workflows moving.", tools: ["Text to PDF"] },
  { name: "Developer", icon: "</>", description: "Format, encode, validate and transform technical data.", tools: ["JSON Formatter", "JSON Minifier", "Base64 Encoder", "Base64 File Encoder", "UUID Generator", "Bulk UUID Generator", "URL Encoder / Decoder", "URL Parser", "Regex Tester", "HTML Entity Encoder", "HTML Minifier", "Markdown to HTML", "Unix Timestamp Converter", "SHA-256 Hash Generator", "JWT Decoder"] },
  { name: "Text & Productivity", icon: "Aa", description: "Write, count, compare and focus without the clutter.", tools: ["Typing Test", "Word Counter", "Character Counter", "Pomodoro Timer", "Countdown Timer", "Text Case Converter", "Remove Duplicate Lines", "Text Sorter", "Text Diff"] },
  { name: "Everyday", icon: "✦", description: "Small utilities for decisions, colors, QR codes and more.", tools: ["Password Generator", "Random Number Generator", "Coin Flip", "Online Ruler", "QR Code Generator", "Stopwatch", "Color Converter", "URL Slug Generator", "Percentage Calculator", "Age Calculator", "JSON to CSV", "CSV to JSON"] }
] as const;

const slug = (name: string) => ({
  "Print Size Calculator": "print-size-calculator", "DPI Calculator": "dpi-calculator", "Pixels to Inches": "pixels-to-inches", "Image Resolution Checker": "image-resolution-checker", "Image Format Converter": "image-converter", "Image Resizer": "image-resizer", "Image Compressor": "image-compressor", "Image Cropper": "image-cropper", "Text to PDF": "text-to-pdf", "JSON Formatter": "json-formatter", "JSON Minifier": "json-minifier", "Base64 Encoder": "base64-encoder", "Base64 File Encoder": "base64-file", "UUID Generator": "uuid-generator", "Bulk UUID Generator": "uuid-bulk-generator", "URL Encoder / Decoder": "url-encoder-decoder", "URL Parser": "url-parser", "Regex Tester": "regex-tester", "HTML Entity Encoder": "html-entity-encoder", "HTML Minifier": "html-minifier", "Markdown to HTML": "markdown-to-html", "Unix Timestamp Converter": "timestamp-converter", "SHA-256 Hash Generator": "hash-generator", "JWT Decoder": "jwt-decoder", "Typing Test": "typing-test", "Word Counter": "word-counter", "Character Counter": "character-counter", "Pomodoro Timer": "pomodoro-timer", "Countdown Timer": "countdown-timer", "Text Case Converter": "text-case-converter", "Remove Duplicate Lines": "remove-duplicate-lines", "Text Sorter": "text-sorter", "Text Diff": "text-diff", "Password Generator": "password-generator", "Random Number Generator": "random-number-generator", "Coin Flip": "coin-flip", "Online Ruler": "online-ruler", "QR Code Generator": "qr-code-generator", "Stopwatch": "stopwatch", "Color Converter": "color-converter", "URL Slug Generator": "slug-generator", "Percentage Calculator": "percentage-calculator", "Age Calculator": "age-calculator", "JSON to CSV": "json-to-csv", "CSV to JSON": "csv-to-json"
}[name] || "");

const popular = ["Image Compressor", "Image Resizer", "Image Format Converter", "Typing Test", "JSON Formatter", "QR Code Generator", "Online Ruler", "Password Generator"];
const icons = ["◫", "↔", "⇄", "⌨", "{ }", "▦", "▥", "⚿"];
const workflows = [
  { label: "IMAGE → READY", title: "Make an image ready to use", description: "Start with your file, fix the size, then export exactly what you need.", steps: ["Image Resizer", "Image Compressor", "Image Format Converter"] },
  { label: "DATA → CLEAN", title: "Clean up developer data", description: "Format, validate and transform messy data without leaving the browser.", steps: ["JSON Formatter", "JSON Minifier", "JSON to CSV"] },
  { label: "TEXT → FOCUSED", title: "Write, count and focus", description: "Handle everyday text tasks with tools that stay out of your way.", steps: ["Word Counter", "Text Case Converter", "Typing Test"] }
];
const all = categories.flatMap(c => c.tools.map(name => ({ name, category: c.name, href: `/${slug(name)}/` })));
const descriptions = new Map<string, string>(categories.flatMap(c => c.tools.map(name => [name, c.description])));

export default function Home() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => all.filter(t => `${t.name} ${t.category}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 8), [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
      if (event.key === "Escape" && document.activeElement === inputRef.current) {
        setQuery("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const Logo = () => <><img className={styles.logoMark} src="/logo-white.webp" alt="" aria-hidden="true" /><span><strong>Fame</strong>Orbit</span></>;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/"><Logo /></Link>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#popular">Popular</a><a href="#workflows">Workflows</a><a href="#categories">Categories</a><a href="#all-tools">All tools</a>
        </nav>
        <span className={styles.tag}>FREE · PRIVATE · FAST</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.eyebrow}>THE EVERYDAY WEB TOOLKIT</div>
        <h1>What do you need<br /><em>to get done?</em></h1>
        <p className={styles.heroCopy}>Fast, focused tools for images, text, developers and everyday tasks. No account. No upload by default. Just get it done.</p>
        <div className={styles.searchWrap}>
          <div className={styles.search}>
            <span className={styles.searchIcon}>⌕</span>
            <input ref={inputRef} aria-label="Search tools" placeholder="Search a tool — try “compress”, “json”, “typing”..." value={query} onChange={e => setQuery(e.target.value)} />
            <kbd>Ctrl K</kbd>
          </div>
          {query && <div className={styles.searchResults} role="listbox">
            {results.length ? results.map(t => <Link className={styles.searchResult} href={t.href} key={t.name} onClick={() => setQuery("")}>
              <span className={styles.searchResultName}>{t.name}</span><small className={styles.searchResultCategory}>{t.category}</small><b className={styles.searchResultArrow}>↗</b>
            </Link>) : <div className={styles.noResults}>No matching tool yet. Try a broader search.</div>}
          </div>}
        </div>
        <div className={styles.heroMeta}><span>✓ Runs in your browser</span><span>✓ No signup</span><span>✓ Built for speed</span></div>
      </section>

      <section className={styles.trust}><span>PRIVATE BY DEFAULT</span><i className={styles.dot} /><span>NO SIGN-UP</span><i className={styles.dot} /><span>FAST IN YOUR BROWSER</span><i className={styles.dot} /><span>FREE TO USE</span></section>

      <section className={styles.section} id="popular">
        <div className={styles.sectionHead}><div><div className={styles.eyebrow}>START HERE</div><h2>Popular tools</h2></div><p>Quick answers to the things people search for most.</p></div>
        <div className={styles.popularGrid}>{popular.map((name, i) => <Link href={`/${slug(name)}/`} className={styles.popularCard} key={name}>
          <span className={styles.popularIcon}>{icons[i]}</span><div><small>0{i + 1}</small><h3>{name}</h3><p>{descriptions.get(name)}</p></div><b className={styles.arrow}>↗</b>
        </Link>)}</div>
      </section>

      <section className={`${styles.section} ${styles.workflowSection}`} id="workflows">
        <div className={styles.sectionHead}><div><div className={styles.eyebrow}>DONE IN A FLOW</div><h2>Don't restart. Keep going.</h2></div><p>Useful tools become much better when the next step is obvious.</p></div>
        <div className={styles.workflowGrid}>{workflows.map((flow, index) => <article className={styles.workflow} key={flow.title}>
          <div className={styles.workflowTop}><span>{flow.label}</span><b>0{index + 1}</b></div>
          <h3>{flow.title}</h3><p>{flow.description}</p>
          <div className={styles.workflowSteps}>{flow.steps.map((step, stepIndex) => <Link href={`/${slug(step)}/`} key={step}><span>{stepIndex + 1}</span>{step}<b>→</b></Link>)}</div>
        </article>)}</div>
      </section>

      <section className={styles.section} id="categories">
        <div className={styles.sectionHead}><div><div className={styles.eyebrow}>WORKFLOWS</div><h2>Tools that work together.</h2></div><p>Pick a task, then move naturally to the next step instead of starting over.</p></div>
        <div className={styles.categoryGrid}>{categories.map(c => <article className={styles.category} key={c.name}>
          <div className={styles.categoryIcon}>{c.icon}</div><h3>{c.name}</h3><p className={styles.categoryDesc}>{c.description}</p>
          <div className={styles.categoryLinks}>{c.tools.slice(0, 4).map(t => <Link href={`/${slug(t)}/`} key={t}>{t}<span>↗</span></Link>)}</div>
          <Link className={styles.categoryMore} href="#all-tools">View all {c.tools.length} tools →</Link>
        </article>)}</div>
      </section>

      <section className={styles.privacy}>
        <div className={styles.privacyMain}><span className={styles.privacyIcon}>⌁</span><div><div className={styles.eyebrow}>PRIVACY-FIRST DESIGN</div><h2>Your files stay yours.</h2><p>Whenever a tool can run locally, FameOrbit processes it in your browser. We don't need your files to make the tool useful.</p></div></div>
        <span className={styles.privacyPill}>🔒 PRIVATE BY DEFAULT</span>
      </section>

      <section className={`${styles.section} ${styles.allTools}`} id="all-tools">
        <div className={styles.sectionHead}><div><div className={styles.eyebrow}>THE FULL TOOLKIT</div><h2>Everything, organized.</h2></div><p>{all.length} focused tools and growing.</p></div>
        <div className={styles.allToolGrid}>{all.map((t, i) => <Link className={styles.allTool} href={t.href} key={t.name}><span>{String(i + 1).padStart(2, "0")}</span><div><strong>{t.name}</strong><small>{t.category}</small></div><b>↗</b></Link>)}</div>
      </section>

      <footer className={styles.footer}><div><Link className={styles.brand} href="/"><Logo /></Link><p>Small tools. Done properly.</p></div><div><Link href="/about/">About</Link><Link href="/privacy/">Privacy</Link><Link href="/terms/">Terms</Link></div></footer>
    </main>
  );
}
