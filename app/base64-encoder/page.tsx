"use client";

import Link from "next/link";
import { useState } from "react";
import AdSlot from "../components/AdSlot";

export default function Base64Encoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  function convert() {
    setError("");
    try {
      if (!text) { setResult(""); return; }
      if (mode === "encode") setResult(btoa(unescape(encodeURIComponent(text))));
      else setResult(decodeURIComponent(escape(atob(text.replace(/\s/g, "")))));
    } catch { setResult(""); setError("That text is not valid Base64."); }
  }

  return <main>
    <header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><span className="headerTag">DEVELOPER TOOL · BASE64</span></header>
    <section className="hero"><div className="eyebrow">ENCODE & DECODE</div><h1>Base64,<br/><em>without the hassle.</em></h1><p className="lead">Encode text to Base64 or decode Base64 back into readable text. Everything happens locally in your browser.</p>
      <div className="panel custom"><div className="panelHead"><h2>Base64 converter</h2><p>Your data never leaves this page.</p></div><div className="heroActions"><button className="primaryAction" onClick={()=>{setMode("encode");setResult("")}}>Encode</button><button className="secondaryAction" onClick={()=>{setMode("decode");setResult("")}}>Decode</button></div><label className="toolLabel">{mode === "encode" ? "TEXT TO ENCODE" : "BASE64 TO DECODE"}<textarea className="toolTextarea" rows={9} value={text} onChange={e=>setText(e.target.value)} placeholder={mode === "encode" ? "Type or paste text..." : "Paste Base64 here..."}/></label><button className="primaryAction fullAction" onClick={convert}>{mode === "encode" ? "Encode to Base64" : "Decode Base64"} <span>↗</span></button>{error && <p className="errorText">{error}</p>}{result && <label className="toolLabel">RESULT<textarea className="toolTextarea" rows={9} readOnly value={result}/></label>}</div>
    </section><AdSlot placement="after-calculator"/><section className="contentSection"><div className="contentInner"><div className="eyebrow">ABOUT BASE64</div><h2>What is Base64 encoding?</h2><p>Base64 represents binary or text data using a limited set of ASCII characters. It is commonly used when data needs to travel safely through systems designed for text.</p><div className="guideGrid"><article><h3>Encode text</h3><p>Turn normal text into a Base64 string for APIs, data URLs and other developer workflows.</p></article><article><h3>Decode data</h3><p>Paste a Base64 string to recover the original UTF-8 text when it contains readable text.</p></article><article><h3>Private by design</h3><p>This tool uses your browser's built-in encoding functions. Nothing is uploaded.</p></article></div></div></section><footer><span>FameOrbit · Base64 Encoder</span><Link href="/">Explore all FameOrbit tools</Link></footer>
  </main>;
}
