"use client";

import Link from "next/link";
import { useState } from "react";

export default function TextCaseConverter(){
 const [text,setText]=useState("");
 const convert=(type:string)=>{if(type==="upper")return text.toUpperCase();if(type==="lower")return text.toLowerCase();if(type==="title")return text.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());if(type==="sentence")return text.toLowerCase().replace(/(^|[.!?]\s+)([a-z])/g,(_,a,b)=>a+b.toUpperCase());return text;};
 const [result,setResult]=useState("");
 return <main><header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><span className="headerTag">TEXT CASE</span></header><section className="toolPage"><div className="eyebrow">TEXT TOOL</div><h1>Text Case <em>Converter</em></h1><p className="toolIntro">Convert text to uppercase, lowercase, title case, or sentence case instantly.</p><div className="calculatorCard"><label className="toolLabel">Your text<textarea className="toolTextarea" rows={8} value={text} onChange={e=>{setText(e.target.value);setResult("")}} placeholder="Type or paste text here..."/></label><div className="buttonRow">{[["upper","UPPERCASE"],["lower","lowercase"],["title","Title Case"],["sentence","Sentence case"]].map(([k,l])=><button key={k} className="secondaryButton" onClick={()=>setResult(convert(k))}>{l}</button>)}</div>{result!==""&&<label className="toolLabel">Converted text<textarea className="toolTextarea" rows={8} readOnly value={result}/></label>}</div><p><Link href="/">← Back to FameOrbit</Link></p></section></main>;
}