"use client";

import { useMemo, useRef, useState } from "react";

const presets = [
  ["4 × 6 in", 4, 6], ["5 × 7 in", 5, 7], ["8 × 10 in", 8, 10], ["8 × 12 in", 8, 12],
  ["11 × 14 in", 11, 14], ["12 × 18 in", 12, 18], ["A4", 8.27, 11.69], ["A3", 11.69, 16.54],
  ["18 × 24 in", 18, 24], ["24 × 36 in", 24, 36],
] as const;

function quality(ppi: number) {
  if (ppi >= 300) return ["Excellent", "Your image has plenty of resolution for a sharp print."];
  if (ppi >= 240) return ["Very good", "Great quality for most photo printing."];
  if (ppi >= 200) return ["Good", "Good quality for many prints and normal viewing distances."];
  if (ppi >= 150) return ["Acceptable", "Often fine for larger prints viewed from farther away."];
  return ["Low resolution", "Consider a smaller print or a higher-resolution image."];
}

function fmt(n: number) { return n >= 100 ? Math.round(n).toLocaleString() : n.toFixed(1).replace(/\.0$/, ""); }

export default function Home() {
  const input = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<{url:string;width:number;height:number,size:number,type:string}|null>(null);
  const [customW, setCustomW] = useState("8");
  const [customH, setCustomH] = useState("10");
  const [drag, setDrag] = useState(false);

  const analyze = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => setImage({ url, width: img.naturalWidth, height: img.naturalHeight, size: file.size, type: file.type.split("/")[1].toUpperCase() });
    img.src = url;
  };
  const onDrop = (e: React.DragEvent) => { e.preventDefault(); setDrag(false); analyze(e.dataTransfer.files[0]); };

  const data = useMemo(() => {
    if (!image) return null;
    const max300W = image.width / 300, max300H = image.height / 300;
    const mp = image.width * image.height / 1e6;
    return { mp, ratio: image.width / image.height, max300W, max300H };
  }, [image]);

  return <main>
    <header><a className="brand" href="/">Print<span>Size</span></a><div className="badge">FREE · PRIVATE · NO UPLOAD</div></header>
    <section className="hero">
      <div className="eyebrow">PRINT WITH CONFIDENCE</div>
      <h1>What size can you<br/><em>print this image?</em></h1>
      <p className="lead">Upload a photo and instantly find its best print size, effective PPI, and quality. No image is uploaded to a server.</p>
      {!image ? <div className={`drop ${drag ? "drag" : ""}`} onClick={() => input.current?.click()} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={onDrop}>
        <input ref={input} type="file" accept="image/*" hidden onChange={e=>analyze(e.target.files?.[0])}/>
        <div className="uploadIcon">↑</div><strong>Drop your image here</strong><span>or click to browse · JPG, PNG, WebP and more</span>
      </div> : <>
        <div className="summary">
          <div className="thumb"><img src={image.url} alt="Uploaded image preview"/></div>
          <div><div className="small">YOUR IMAGE</div><div className="big">{image.width.toLocaleString()} × {image.height.toLocaleString()} px</div><div className="muted">{data?.mp.toFixed(1)} MP · {image.type} · {(image.size/1024/1024).toFixed(2)} MB · {data?.ratio.toFixed(2)}:1</div></div>
          <button className="change" onClick={()=>{setImage(null); input.current?.click()}}>Change</button>
        </div>
        <div className="best"><div><div className="small">BEST-QUALITY PRINT</div><div className="bestSize">{fmt(data!.max300W)} × {fmt(data!.max300H)} <small>in</small></div><p>At 300 PPI · your sharpest practical print</p></div><div className="check">✓</div></div>
        <div className="panel"><div className="panelHead"><div><h2>Common print sizes</h2><p>See how your image performs at popular sizes.</p></div></div><div className="table">{presets.map(([name,w,h])=>{const ppi=Math.min(image.width/w,image.height/h);const [q]=quality(ppi);return <div className="row" key={name}><span>{name}</span><strong>{Math.round(ppi)} PPI</strong><span className={`status ${q.toLowerCase().replace(" ","-")}`}>{q}</span></div>})}</div></div>
        <div className="panel custom"><h2>Check a custom print size</h2><div className="inputs"><label>WIDTH<input type="number" min="0.1" step="0.1" value={customW} onChange={e=>setCustomW(e.target.value)}/></label><span>×</span><label>HEIGHT<input type="number" min="0.1" step="0.1" value={customH} onChange={e=>setCustomH(e.target.value)}/></label><span className="unit">inches</span></div>{Number(customW)>0&&Number(customH)>0&&(()=>{const p=Math.min(image.width/Number(customW),image.height/Number(customH));const [q,d]=quality(p);return <div className="customResult"><strong>{Math.round(p)} PPI</strong><span className="status">{q}</span><p>{d}</p></div>})()}</div>
        <button className="reset" onClick={()=>setImage(null)}>Analyze another image</button>
      </>}
    </section>
    <section className="info"><div><div className="eyebrow">HOW IT WORKS</div><h2>Your pixels, translated<br/>into real-world size.</h2></div><div className="infoGrid"><article><b>01</b><h3>Upload privately</h3><p>Your image is processed entirely in your browser. It never leaves your device.</p></article><article><b>02</b><h3>We calculate</h3><p>We compare your pixel dimensions against standard print sizes and PPI targets.</p></article><article><b>03</b><h3>Print confidently</h3><p>Get a clear recommendation instead of guessing whether your photo is large enough.</p></article></div></section>
    <section className="contentSection">
      <div className="contentInner">
        <div className="eyebrow">PRINT SIZE GUIDE</div>
        <h2>How large can you print a photo?</h2>
        <p>The maximum high-quality print size depends mainly on your image pixel dimensions. A useful starting point is 300 PPI (pixels per inch): divide the image width and height in pixels by 300 to estimate the print size in inches.</p>
        <div className="guideGrid">
          <article><h3>What is PPI?</h3><p>PPI means pixels per inch. It describes how densely the pixels in your image are reproduced across the printed area. Higher PPI generally gives a sharper print when viewed closely.</p></article>
          <article><h3>Is 300 PPI required?</h3><p>No. 300 PPI is a useful quality target, not a hard rule. Large posters, signs and wall art can look excellent at lower PPI because they are normally viewed from farther away.</p></article>
          <article><h3>What about DPI?</h3><p>DPI technically describes printer dots, while PPI describes image pixels. People often use “DPI” when talking about photo resolution, but this calculator uses PPI for the image-to-print calculation.</p></article>
        </div>
      </div>
    </section>
    <section className="faqSection">
      <div className="contentInner">
        <div className="eyebrow">FAQ</div>
        <h2>Print size calculator questions</h2>
        <div className="faqList">
          <details><summary>What size can I print my photo?</summary><p>Upload your image to see its pixel dimensions and the largest practical print size at 300 PPI. You can also check common sizes such as 4 × 6, 5 × 7, A4, A3 and 24 × 36 inches.</p></details>
          <details><summary>How do I calculate print size from pixels?</summary><p>For a 300 PPI target, divide the image width and height in pixels by 300. For example, a 3000 × 2400 pixel image corresponds to about 10 × 8 inches at 300 PPI.</p></details>
          <details><summary>Can I print a low-resolution image?</summary><p>Yes. The calculator shows the estimated PPI at different print sizes so you can decide whether the result is suitable. A lower PPI can still work for large prints viewed from a distance.</p></details>
          <details><summary>Are my photos uploaded or stored?</summary><p>No. Image dimensions are read directly in your browser using the selected file. The calculator does not need to upload your photo to a server.</p></details>
          <details><summary>What is a good PPI for photo printing?</summary><p>300 PPI is a strong target for sharp, close-viewed photo prints. Around 240–300 PPI is very good for many uses, while larger wall prints can often be acceptable at lower PPI.</p></details>
        </div>
      </div>
    </section>
    <footer><span>PrintSize · Free image print calculator</span><span>Your images never leave your device.</span></footer>
  </main>;
}
