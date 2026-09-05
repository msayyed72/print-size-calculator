"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function quality(ppi: number) {
  if (ppi >= 300) return ["Excellent", "Sharp enough for high-quality photo printing."];
  if (ppi >= 240) return ["Very good", "Great quality for most prints."];
  if (ppi >= 200) return ["Good", "Good for many everyday prints."];
  if (ppi >= 150) return ["Acceptable", "Often fine for larger prints viewed from farther away."];
  return ["Low resolution", "Consider a smaller print or a higher-resolution image."];
}

export default function DpiCalculator() {
  const [width, setWidth] = useState("4000");
  const [height, setHeight] = useState("3000");
  const [ppi, setPpi] = useState("300");
  const [printW, setPrintW] = useState("12");
  const [printH, setPrintH] = useState("9");

  const result = useMemo(() => {
    const w = Number(width), h = Number(height), p = Number(ppi);
    const pw = Number(printW), ph = Number(printH);
    if (!(w > 0 && h > 0)) return null;
    const maxW = w / (p > 0 ? p : 300);
    const maxH = h / (p > 0 ? p : 300);
    const effective = pw > 0 && ph > 0 ? Math.min(w / pw, h / ph) : 0;
    const [label, description] = quality(effective);
    return { maxW, maxH, effective, label, description, mp: (w * h) / 1e6 };
  }, [width, height, ppi, printW, printH]);

  return (
    <main>
      <header><Link className="brand" href="/">Fame<strong>Orbit</strong></Link><span className="headerTag">IMAGE TOOL · DPI CALCULATOR</span></header>
      <section className="hero">
        <div className="eyebrow">IMAGE RESOLUTION MADE SIMPLE</div>
        <h1>Calculate your image<br/><em>print resolution.</em></h1>
        <p className="lead">Enter your pixel dimensions and target print size to calculate PPI and find out whether your image is sharp enough.</p>

        <div className="panel custom">
          <h2>Image dimensions</h2><p>Enter the pixel width and height of your image.</p>
          <div className="inputs">
            <label>WIDTH<input type="number" min="1" value={width} onChange={e=>setWidth(e.target.value)}/></label>
            <span>×</span>
            <label>HEIGHT<input type="number" min="1" value={height} onChange={e=>setHeight(e.target.value)}/></label>
            <span className="unit">pixels</span>
          </div>
        </div>

        {result && <div className="best"><div><div className="small">MAXIMUM SIZE AT TARGET PPI</div><div className="bestSize">{result.maxW.toFixed(1)} × {result.maxH.toFixed(1)} <small>in</small></div><p>{result.mp.toFixed(1)} MP image · target {Number(ppi) || 300} PPI</p></div><div className="check">✓</div></div>}

        <div className="panel custom">
          <h2>Check a print size</h2><p>Find the effective PPI for a specific physical print.</p>
          <div className="inputs">
            <label>PRINT WIDTH<input type="number" min="0.1" step="0.1" value={printW} onChange={e=>setPrintW(e.target.value)}/></label>
            <span>×</span>
            <label>PRINT HEIGHT<input type="number" min="0.1" step="0.1" value={printH} onChange={e=>setPrintH(e.target.value)}/></label>
            <span className="unit">inches</span>
          </div>
          <div className="inputs"><label>TARGET PPI<input type="number" min="1" value={ppi} onChange={e=>setPpi(e.target.value)}/></label></div>
          {result && <div className="customResult"><strong>{Math.round(result.effective)} PPI</strong><span className="status">{result.label}</span><p>{result.description}</p></div>}
        </div>

        <div className="panel">
          <div className="panelHead"><h2>Common PPI targets</h2><p>Use these as practical starting points for different print situations.</p></div>
          <div className="table">
            {[[300,"High-quality photo prints","Sharp, close viewing"],[240,"Very good quality","Most photo printing"],[200,"Good quality","Many everyday prints"],[150,"Large-format prints","Usually viewed farther away"]].map(([value,name,note])=><div className="row" key={value}><span><strong>{value} PPI</strong></span><span>{name}</span><span className="muted">{note}</span></div>)}
          </div>
        </div>
      </section>
      <section className="contentSection"><div className="contentInner"><div className="eyebrow">DPI & PPI GUIDE</div><h2>What resolution should you use?</h2><p>For photo printing, 300 PPI is a useful target for sharp prints. Larger artwork can often look excellent at lower PPI because viewing distance increases.</p><div className="guideGrid"><article><h3>300 PPI</h3><p>A strong target for detailed photos, small prints and close viewing.</p></article><article><h3>200–240 PPI</h3><p>A practical range for many standard prints without unnecessarily large files.</p></article><article><h3>150 PPI</h3><p>Often suitable for posters and larger prints viewed from a distance.</p></article></div></div></section>
      <section className="faqSection"><div className="contentInner"><div className="eyebrow">FAQ</div><h2>DPI calculator questions</h2><div className="faqList"><details><summary>Is DPI the same as PPI?</summary><p>Not technically. PPI describes image pixels per inch, while DPI describes printer dots. For image-to-print calculations, PPI is the useful measurement.</p></details><details><summary>What is the best PPI for printing?</summary><p>300 PPI is a strong general target for sharp photo prints, but lower values can work well for larger prints.</p></details><details><summary>How do I calculate PPI?</summary><p>Divide the image pixel width by the print width in inches, and do the same for height. The lower resulting value is the effective PPI.</p></details></div></div></section>
      <footer><span>FameOrbit · DPI Calculator</span><Link href="/">Explore all FameOrbit tools</Link></footer>
    </main>
  );
}
