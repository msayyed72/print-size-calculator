"use client";

import Link from "next/link";
import { useState } from "react";

export default function RemoveDuplicateLines(){
 const [text,setText]=useState(""); const [result,setResult]=useState("");
 const remove=()=>{const seen=new Set<string>(); const out=text.split(/\r?\n/).filter(line=>{const key=line.trim(); if(seen.has(key))return false; seen.add(key); return true;}); setResult(out.join("\n"));};
 return <main><header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><span className="headerTag">DUPLICATE LINES</span></header><section className="toolPage"><div className="eyebrow">TEXT TOOL</div><h1>Remove Duplicate <em>Lines</em></h1><p className="toolIntro">Paste a list and instantly keep only the first occurrence of each line.</p><div className="calculatorCard"><label className="toolLabel">Input<textarea className="toolTextarea" rows={10} value={text} onChange={e=>setText(e.target.value)} placeholder="One item per line..."/></label><button className="primaryButton fullAction" onClick={remove}>Remove duplicates</button>{result!==""&&<label className="toolLabel">Result<textarea className="toolTextarea" rows={10} readOnly value={result}/></label>}</div><h2>How it works</h2><p>Duplicate detection ignores leading and trailing spaces and keeps the first version of each unique line. Your text stays in the browser.</p><p><Link href="/">← Back to FameOrbit</Link></p></section></main>;
}