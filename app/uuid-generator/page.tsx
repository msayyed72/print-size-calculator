"use client";
import Link from "next/link";
import { useState } from "react";
import AdSlot from "../components/AdSlot";

function makeUuid() { return crypto.randomUUID(); }
export default function UUIDGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>(() => Array.from({length:5}, makeUuid));
  const generate = () => setUuids(Array.from({length:Math.min(50,Math.max(1,count))}, makeUuid));
  const copy = async () => navigator.clipboard?.writeText(uuids.join("\n"));
  return <main><header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><span className="headerTag">DEVELOPER TOOL · UUID GENERATOR</span></header><section className="hero"><div className="eyebrow">GENERATE INSTANTLY</div><h1>Fresh UUIDs,<br/><em>on demand.</em></h1><p className="lead">Generate RFC 4122 version 4 UUIDs directly in your browser. No account, API or server required.</p><div className="panel custom"><div className="inputs"><label>QUANTITY<input type="number" min="1" max="50" value={count} onChange={e=>setCount(Number(e.target.value))}/></label><button className="primaryAction" type="button" onClick={generate}>Generate ↗</button><button className="secondaryAction" type="button" onClick={copy}>Copy all</button></div><div style={{display:"grid",gap:"10px",marginTop:"20px"}}>{uuids.map((id,i)=><code key={i} style={{display:"block",padding:"14px 16px",background:"#fffdf8",border:"1px solid rgba(20,20,18,.12)",borderRadius:"10px",fontSize:"15px",overflowWrap:"anywhere"}}>{id}</code>)}</div></div><p className="muted">UUIDs are generated locally using your browser's cryptographic random generator.</p></section><AdSlot placement="after-calculator"/><section className="contentSection"><div className="contentInner"><div className="eyebrow">DEVELOPER BASICS</div><h2>What is a UUID?</h2><p>A UUID is a 128-bit identifier commonly represented as a 36-character string. Version 4 UUIDs are randomly generated and are widely useful for IDs, records, requests and test data.</p><div className="guideGrid"><article><h3>Version 4</h3><p>This generator uses browser-native random UUID generation.</p></article><article><h3>Up to 50</h3><p>Generate a small batch of identifiers in one click.</p></article><article><h3>Private</h3><p>No generated UUID is sent to FameOrbit or stored remotely.</p></article></div></div></section><footer><span>FameOrbit · UUID Generator</span><Link href="/">Explore all FameOrbit tools</Link></footer></main>;
}
