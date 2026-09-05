"use client";
import Link from "next/link";
import { useState } from "react";
import AdSlot from "../components/AdSlot";

const sample = '{\n  "name": "FameOrbit",\n  "free": true,\n  "tools": ["compress", "format", "convert"]\n}';
export default function JSONFormatter() {
  const [input, setInput] = useState(""); const [output, setOutput] = useState(""); const [error, setError] = useState(""); const [copied, setCopied] = useState(false);
  const run = (mode: "format" | "minify") => { try { const value = JSON.parse(input); setOutput(mode === "format" ? JSON.stringify(value, null, 2) : JSON.stringify(value)); setError(""); setCopied(false); } catch (e) { setOutput(""); setError(e instanceof Error ? e.message : "Invalid JSON"); } };
  const copy = async () => { if (!output) return; await navigator.clipboard?.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1400); };
  const clear = () => { setInput(""); setOutput(""); setError(""); setCopied(false); };
  return <main><header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><span className="headerTag">DEVELOPER TOOL · JSON FORMATTER</span></header>
    <section className="hero"><div className="eyebrow">FORMAT · VALIDATE · MINIFY</div><h1>Clean JSON,<br/><em>without the headache.</em></h1><p className="lead">Paste JSON, format it for readability, validate its syntax or minify it for compact output. Processing happens locally.</p>
      <div className="panel custom"><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px",marginBottom:"12px"}}><h2 style={{margin:0}}>JSON input</h2><div style={{display:"flex",gap:"7px"}}><button className="secondaryAction" type="button" onClick={()=>setInput(sample)}>Example</button><button className="secondaryAction" type="button" onClick={clear} disabled={!input&&!output}>Clear</button></div></div>
        <textarea value={input} onChange={e=>{setInput(e.target.value);setError("")}} placeholder={'{"name":"FameOrbit","free":true}'} rows={12} spellCheck={false} style={{width:"100%",resize:"vertical",font:"ui-monospace, SFMono-Regular, Menlo, monospace",padding:"18px",borderRadius:"14px",border:"1px solid rgba(20,20,18,.14)",background:"#fffdf8",boxSizing:"border-box",outline:"none",lineHeight:1.55}}/>
        <div className="heroActions"><button className="primaryAction" type="button" onClick={()=>run("format")} disabled={!input.trim()}>Format JSON →</button><button className="secondaryAction" type="button" onClick={()=>run("minify")} disabled={!input.trim()}>Minify</button></div>
        {error && <p className="status low-resolution" style={{marginTop:"16px",display:"inline-block"}}>Invalid JSON · {error}</p>}
        {output && <><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px",marginTop:"28px"}}><h2 style={{margin:0}}>Output</h2><button className="secondaryAction" type="button" onClick={copy}>{copied ? "Copied ✓" : "Copy output"}</button></div><pre style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere",padding:"18px",borderRadius:"14px",background:"#171715",color:"#f7f4ec",overflowX:"auto",lineHeight:1.6,marginBottom:0}}>{output}</pre></>}
      </div><p className="muted">🔒 Your JSON never leaves this browser.</p>
    </section><AdSlot placement="after-calculator"/><section className="contentSection"><div className="contentInner"><div className="eyebrow">JSON TOOLKIT</div><h2>Format and validate in seconds.</h2><p>JSON is commonly used for APIs, configuration and data exchange. Formatting makes nested data easier to inspect, while parsing catches syntax errors before you send it elsewhere.</p><div className="guideGrid"><article><h3>Format</h3><p>Pretty-print valid JSON with two-space indentation.</p></article><article><h3>Minify</h3><p>Remove unnecessary whitespace for compact JSON output.</p></article><article><h3>Local processing</h3><p>Your data stays in your browser while you work.</p></article></div></div></section><footer><span>FameOrbit · JSON Formatter</span><Link href="/">Explore all FameOrbit tools</Link></footer></main>;
}
