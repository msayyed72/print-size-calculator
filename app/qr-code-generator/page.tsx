"use client";

import Link from "next/link";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import AdSlot from "../components/AdSlot";

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://fameorbit.app");
  const [svg, setSvg] = useState("");

  useEffect(() => {
    QRCode.toString(text || "FameOrbit", { type: "svg", margin: 2, errorCorrectionLevel: "M" }).then(setSvg).catch(() => setSvg(""));
  }, [text]);

  function download() { if (!svg) return; const blob=new Blob([svg],{type:"image/svg+xml"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="fameorbit-qr.svg"; a.click(); URL.revokeObjectURL(url); }

  return <main>
    <header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><span className="headerTag">EVERYDAY TOOL · QR CODE</span></header>
    <section className="hero"><div className="eyebrow">CREATE INSTANTLY</div><h1>QR codes,<br/><em>made in seconds.</em></h1><p className="lead">Turn a link or short text into a real scannable QR code right in your browser.</p><div className="panel custom"><div className="panelHead"><h2>Your content</h2><p>Enter a URL, message or other short text.</p></div><label className="toolLabel">TEXT OR URL<textarea className="toolTextarea" rows={5} value={text} onChange={e=>setText(e.target.value)} placeholder="https://example.com"/></label>{svg && <div className="qrPreview" dangerouslySetInnerHTML={{__html:svg}}/>}<button className="primaryAction fullAction" onClick={download} disabled={!svg}>Download SVG <span>↗</span></button><p className="muted">QR generation happens locally in your browser. No text is uploaded.</p></div></section><AdSlot placement="after-calculator"/><section className="contentSection"><div className="contentInner"><div className="eyebrow">QR CODE BASICS</div><h2>What can you put in a QR code?</h2><p>QR codes can share links, contact details, short messages and other machine-readable information. Keep content concise for easier scanning.</p><div className="guideGrid"><article><h3>Share links</h3><p>Turn a website address into a code that people can scan with a phone.</p></article><article><h3>Print it</h3><p>Download the SVG and place it on flyers, menus, cards or signage.</p></article><article><h3>Private by design</h3><p>The QR is generated directly in your browser using a local encoder.</p></article></div></div></section><footer><span>FameOrbit · QR Code Generator</span><Link href="/">Explore all FameOrbit tools</Link></footer>
  </main>;
}
