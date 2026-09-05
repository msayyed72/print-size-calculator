"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AdSlot from "../components/AdSlot";

const presets = [
  ["4 × 6 in", 4, 6], ["5 × 7 in", 5, 7], ["8 × 10 in", 8, 10],
  ["8 × 12 in", 8, 12], ["A4", 8.27, 11.69], ["11 × 14 in", 11, 14],
  ["12 × 18 in", 12, 18], ["18 × 24 in", 18, 24], ["24 × 36 in", 24, 36],
] as const;

function grade(ppi: number) {
  if (ppi >= 300) return ["Excellent", "excellent"];
  if (ppi >= 240) return ["Very good", "very-good"];
  if (ppi >= 200) return ["Good", "good"];
  if (ppi >= 150) return ["Acceptable", "acceptable"];
  return ["Low resolution", "low-resolution"];
}

function format(n: number) { return n.toFixed(2).replace(/\.00$/, ""); }

export default function ImageResolutionChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState<{w:number;h:number} | null>(null);
  const [printW, setPrintW] = useState("8");
  const [printH, setPrintH] = useState("10");

  const analysis = useMemo(() => {
    if (!dimensions) return null;
    const w = Number(printW), h = Number(printH);
    if (!w || !h) return null;
    const ppiW = dimensions.w / w, ppiH = dimensions.h / h;
    const ppi = Math.min(ppiW, ppiH);
    const [label, cls] = grade(ppi);
    return { ppi, label, cls, maxW: dimensions.w / 300, maxH: dimensions.h / 300 };
  }, [dimensions, printW, printH]);

  function loadImage(nextFile: File) {
    if (!nextFile.type.startsWith("image/")) return;
    setFile(nextFile);
    const url = URL.createObjectURL(nextFile);
    const img = new Image();
    img.onload = () => { setDimensions({ w: img.naturalWidth, h: img.naturalHeight }); URL.revokeObjectURL(url); };
    img.src = url;
  }

  return <main>
    <header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><span className="headerTag">IMAGE TOOL · RESOLUTION CHECKER</span></header>
    <section className="hero">
      <div className="eyebrow">CHECK YOUR IMAGE</div>
      <h1>Is your image<br/><em>high enough quality?</em></h1>
      <p className="lead">Upload a photo to check its pixel dimensions, megapixels and effective PPI for common print sizes. Your image stays in your browser.</p>
      <label className="drop"><input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0]; if(f) loadImage(f);}}/><strong>{file ? file.name : "Choose an image"}</strong><span>{file ? `${(file.size/1024/1024).toFixed(2)} MB · ${file.type || "image"}` : "or drag and drop it here"}</span></label>
      {dimensions && <div className="summary">
        <div><span className="muted">DIMENSIONS</span><strong className="big">{dimensions.w} × {dimensions.h} px</strong></div>
        <div><span className="muted">MEGAPIXELS</span><strong className="big">{format(dimensions.w * dimensions.h / 1000000)} MP</strong></div>
        <div><span className="muted">ASPECT RATIO</span><strong className="big">{format(dimensions.w / dimensions.h)}:1</strong></div>
      </div>}
      {dimensions && <>
        <div className="panel custom"><h2>Check a print size</h2><p>See the effective PPI and quality for your target dimensions.</p><div className="inputs"><label>WIDTH<input type="number" min="0.1" step="0.1" value={printW} onChange={e=>setPrintW(e.target.value)}/></label><span>×</span><label>HEIGHT<input type="number" min="0.1" step="0.1" value={printH} onChange={e=>setPrintH(e.target.value)}/></label><span className="unit">in</span></div>{analysis && <div className="customResult"><strong>{format(analysis.ppi)} PPI</strong><span className={`status ${analysis.cls}`}>{analysis.label}</span><p>At {printW} × {printH} in, this image produces {format(analysis.ppi)} PPI. Recommended target for sharp photo printing: around 300 PPI.</p></div>}</div>
        <div className="panel"><div className="panelHead"><h2>Common print sizes</h2><p>Click a size to check it instantly.</p></div>{presets.map(([name,w,h])=>{const ppi=Math.min(dimensions.w/w, dimensions.h/h); const [label,cls]=grade(ppi); return <button className="row" key={name} onClick={()=>{setPrintW(String(w));setPrintH(String(h));}}><span>{name}</span><strong>{format(ppi)} PPI</strong><span className={`status ${cls}`}>{label}</span></button>})}</div>
        <div className="best"><div><span className="muted">BEST-QUALITY MAXIMUM</span><strong className="bestSize">{format(analysis?.maxW || 0)} × {format(analysis?.maxH || 0)} in</strong><p className="small">Maximum print size at 300 PPI, using the image's full pixel dimensions.</p></div></div>
      </>}
      <p className="muted">Privacy first: the image is read locally by your browser and is not uploaded to FameOrbit.</p>
    </section>
    <AdSlot placement="after-calculator"/>
    <section className="contentSection"><div className="contentInner"><div className="eyebrow">UNDERSTAND IMAGE RESOLUTION</div><h2>What does an image resolution checker measure?</h2><p>Resolution for printing depends on both pixel dimensions and physical print size. This checker calculates effective PPI by dividing the image pixels by the requested print dimensions.</p><div className="guideGrid"><article><h3>300 PPI</h3><p>A common target for sharp photo prints. If your image reaches 300 PPI at the desired size, you have plenty of detail for most everyday printing.</p></article><article><h3>Large prints</h3><p>Posters and wall art are often viewed from farther away, so lower PPI can still look excellent at a larger physical size.</p></article><article><h3>Pixels matter</h3><p>Upscaling can make an image larger, but it cannot create the same real detail as a higher-resolution original.</p></article></div></div></section>
    <section className="faqSection"><div className="contentInner"><div className="eyebrow">FAQ</div><h2>Image resolution questions</h2><div className="faqList"><details><summary>What resolution is good for printing?</summary><p>Around 300 PPI is a common target for sharp photo printing. Lower values can work well for large prints viewed from farther away.</p></details><details><summary>How do I know my photo is large enough?</summary><p>Check the effective PPI at your intended print dimensions. The larger the print, the more pixels you need to maintain the same PPI.</p></details><details><summary>Does this upload my photo?</summary><p>No. The image is decoded locally in your browser and is not sent to a FameOrbit server.</p></details></div></div></section>
    <footer><span>FameOrbit · Image Resolution Checker</span><Link href="/">Explore all FameOrbit tools</Link></footer>
  </main>;
}
