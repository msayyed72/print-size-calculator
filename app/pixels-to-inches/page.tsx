"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AdSlot from "../components/AdSlot";

const presets = [
  ["HD", 1280, 720], ["Full HD", 1920, 1080], ["2K", 2560, 1440], ["4K", 3840, 2160],
] as const;

function fmt(n: number) {
  return n.toFixed(2).replace(/\.00$/, "");
}

export default function PixelsToInches() {
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");
  const [ppi, setPpi] = useState("300");
  const result = useMemo(() => {
    const w = Number(width), h = Number(height), p = Number(ppi);
    if (!w || !h || !p || w < 0 || h < 0 || p < 0) return null;
    return { w: w / p, h: h / p, diagonal: Math.sqrt((w / p) ** 2 + (h / p) ** 2) };
  }, [width, height, ppi]);

  return <main>
    <header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><span className="headerTag">IMAGE TOOL · PIXELS TO INCHES</span></header>
    <section className="hero">
      <div className="eyebrow">CONVERT INSTANTLY</div>
      <h1>Pixels to inches,<br/><em>made simple.</em></h1>
      <p className="lead">Convert digital image dimensions into physical size using any PPI value. Everything runs locally in your browser.</p>
      <div className="panel custom">
        <h2>Pixel dimensions</h2>
        <p>Enter your image size and target PPI.</p>
        <div className="inputs">
          <label>WIDTH<input type="number" min="1" value={width} onChange={e=>setWidth(e.target.value)}/></label>
          <span>×</span>
          <label>HEIGHT<input type="number" min="1" value={height} onChange={e=>setHeight(e.target.value)}/></label>
          <span className="unit">px</span>
        </div>
        <div className="inputs">
          <label>PPI<input type="number" min="1" value={ppi} onChange={e=>setPpi(e.target.value)}/></label>
        </div>
        {result && <div className="customResult"><strong>{fmt(result.w)} × {fmt(result.h)} in</strong><span className="status excellent">{ppi} PPI</span><p>Physical size: {fmt(result.w * 2.54)} × {fmt(result.h * 2.54)} cm · diagonal: {fmt(result.diagonal)} in</p></div>}
      </div>
      <div className="panel"><div className="panelHead"><h2>Popular screen sizes</h2><p>Physical dimensions at 300 PPI.</p></div>{presets.map(([name,w,h])=><div className="row" key={name}><span>{name}</span><strong>{fmt(w/300)} × {fmt(h/300)} in</strong><span className="status">{w} × {h} px</span></div>)}</div>
      <p className="muted">PPI means pixels per inch. Higher PPI produces a smaller physical size for the same pixel dimensions.</p>
    </section>
    <AdSlot placement="after-calculator"/>
    <section className="contentSection"><div className="contentInner"><div className="eyebrow">PIXELS, PPI & PHYSICAL SIZE</div><h2>How does pixels-to-inches conversion work?</h2><p>Digital images are measured in pixels, while printed or displayed physical dimensions are measured in inches or centimetres. To convert pixels to inches, divide the pixel dimension by the PPI value.</p><div className="guideGrid"><article><h3>The formula</h3><p>Inches = pixels ÷ PPI. For example, 2400 pixels at 300 PPI equals 8 inches.</p></article><article><h3>Why PPI matters</h3><p>The same 2400-pixel image can be printed at different physical sizes depending on the chosen PPI.</p></article><article><h3>300 PPI</h3><p>300 PPI is a common target for sharp photo printing, although large prints can often use lower PPI.</p></article></div></div></section>
    <section className="faqSection"><div className="contentInner"><div className="eyebrow">FAQ</div><h2>Pixels to inches questions</h2><div className="faqList"><details><summary>How many inches is 1920 × 1080 pixels?</summary><p>At 300 PPI, 1920 × 1080 pixels is 6.4 × 3.6 inches.</p></details><details><summary>What is the formula to convert pixels to inches?</summary><p>Divide the pixel width and height by the PPI value.</p></details><details><summary>Does changing PPI change my image pixels?</summary><p>No. PPI changes the calculated physical size; it does not change the actual number of pixels.</p></details></div></div></section>
    <footer><span>FameOrbit · Pixels to Inches</span><Link href="/">Explore all FameOrbit tools</Link></footer>
  </main>;
}
