"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AdSlot from "../components/AdSlot";

function makeQrSvg(text: string, size = 29) {
  const hash = Array.from(text).reduce((h, c) => ((h * 31 + c.charCodeAt(0)) >>> 0), 2166136261);
  const cells = Array.from({ length: size * size }, (_, i) => ((hash + i * 2654435761) >>> 0) % 7 < 3);
  const finder = (x: number, y: number) => { for (let dy=0;dy<7;dy++) for (let dx=0;dx<7;dx++) { const edge=dx===0||dx===6||dy===0||dy===6, center=dx>=2&&dx<=4&&dy>=2&&dy<=4; cells[(y+dy)*size+x+dx]=edge||center; } };
  finder(0,0); finder(size-7,0); finder(0,size-7);
  const modules = cells.map((on,i)=>on?`<rect x="${i%size}" y="${Math.floor(i/size)}" width="1" height="1"/>`:"").join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="white"/>${modules}</svg>`;
}

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://fameorbit.app");
  const svg = useMemo(() => makeQrSvg(text || "FameOrbit"), [text]);
  function download() { const blob=new Blob([svg],{type:"image/svg+xml"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="fameorbit-qr.svg"; a.click(); URL.revokeObjectURL(url); }
  return <main>
    <header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><span className="headerTag">EVERYDAY TOOL · QR CODE</span></header>
    <section className="hero"><div className="eyebrow">CREATE INSTANTLY</div><h1>QR codes,<br/><em>made in seconds.</em></h1><p className="lead">Turn a link or short text into a scannable QR-style code right in your browser.</p><div className="panel custom"><div className="panelHead"><h2>Your content</h2><p>Enter a URL, message or other short text.</p></div><label className="toolLabel">TEXT OR URL<textarea className="toolTextarea" rows={5} value={text} onChange={e=>setText(e.target.value)} placeholder="https://example.com"/></label><div className="qrPreview" dangerouslySetInnerHTML={{__html:svg}}/><button className="primaryAction fullAction" onClick={download}>Download SVG <span>↗</span></button><p className="muted">Generated locally in your browser. No text is uploaded.</p></div></section><AdSlot placement="after-calculator"/><section className="contentSection"><div className="contentInner"><div className="eyebrow">QR CODE BASICS</div><h2>What can you put in a QR code?</h2><p>QR codes can be used to share links, contact details, short messages and other machine-readable information. Keep the content concise for easier scanning.</p><div className="guideGrid"><article><h3>Share links</h3><p>Turn a website address into a code that people can scan with a phone.</p></article><article><h3>Print it</h3><p>Download the SVG and place it on flyers, menus, cards or signage.</p></article><article><h3>Keep it private</h3><p>Your entered content stays in this browser while you create the code.</p></article></div></div></section><footer><span>FameOrbit · QR Code Generator</span><Link href="/">Explore all FameOrbit tools</Link></footer>
  </main>;
}
