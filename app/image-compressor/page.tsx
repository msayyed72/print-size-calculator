"use client";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";
import styles from "./compressor.module.css";

const presets = [
  ["Best", "0.85"],
  ["Balanced", "0.70"],
  ["Smaller", "0.50"],
];
const pretty = (bytes: number) => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1024 / 1024).toFixed(2)} MB`;

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [q, setQ] = useState("0.7");
  const [out, setOut] = useState("");
  const [size, setSize] = useState(0);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const choose = (f: File | undefined) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) { setError("Please choose an image file."); return; }
    setError(""); setOut(""); setSize(0); setFile(f); setPreview(URL.createObjectURL(f));
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => choose(e.target.files?.[0]);
  const compress = () => {
    if (!file) return;
    setError("");
    const u = URL.createObjectURL(file), i = new Image();
    i.onload = () => {
      const c = document.createElement("canvas"); c.width = i.naturalWidth; c.height = i.naturalHeight;
      const x = c.getContext("2d");
      if (!x) { URL.revokeObjectURL(u); setError("Your browser cannot process this image."); return; }
      x.drawImage(i, 0, 0);
      c.toBlob(b => { URL.revokeObjectURL(u); if (b) { setOut(URL.createObjectURL(b)); setSize(b.size); } else setError("Could not create the compressed image."); }, "image/jpeg", Number(q));
    };
    i.onerror = () => { URL.revokeObjectURL(u); setError("This image could not be read."); };
    i.src = u;
  };
  const saved = file && size ? Math.max(0, Math.round((1 - size / file.size) * 100)) : 0;

  return <main className={styles.page}>
    <header className={styles.header}><Link className={styles.brand} href="/"><strong>Fame</strong>Orbit</Link><span className={styles.tag}>IMAGE COMPRESSOR</span></header>
    <section className={styles.hero}>
      <div className={styles.eyebrow}>IMAGE TOOL · 100% LOCAL</div>
      <h1 className={styles.title}>Make images <em>lighter.</em></h1>
      <p className={styles.intro}>Shrink JPEG files while keeping the quality you actually need. Nothing is uploaded.</p>
      <div className={styles.card}>
        {!file ? <label className={`${styles.drop} ${drag ? styles.drag : ""}`} onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={e => { e.preventDefault(); setDrag(false); choose(e.dataTransfer.files?.[0]); }}>
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onChange}/><div><div className={styles.dropIcon}>↑</div><strong>Drop your image here</strong><span>or click to browse · JPG, PNG, WebP</span></div>
        </label> : <div className={styles.file}>
          <img className={styles.thumb} src={preview} alt="Selected image preview"/><div className={styles.fileInfo}><div className={styles.fileName}>{file.name}</div><div className={styles.meta}>{pretty(file.size)} · {file.type.replace("image/", "").toUpperCase()}</div></div><button className={styles.change} type="button" onClick={() => inputRef.current?.click()}>Change</button><input ref={inputRef} hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={onChange}/>
        </div>}
        <div className={styles.settings}>
          <div className={styles.settingHead}><span className={styles.settingTitle}>Compression quality</span><span className={styles.qualityValue}>{Math.round(Number(q) * 100)}%</span></div>
          <input className={styles.range} aria-label="Compression quality" type="range" min="0.2" max="1" step="0.05" value={q} onChange={e => setQ(e.target.value)}/>
          <div className={styles.presets}>{presets.map(([name, value]) => <button key={value} type="button" className={`${styles.preset} ${q === value ? styles.presetActive : ""}`} onClick={() => setQ(value)}>{name}</button>)}</div>
          <button className={styles.primary} onClick={compress} disabled={!file}>Compress image →</button>
          {error && <p className={styles.error}>{error}</p>}
          {out && <div className={styles.result}><div className={styles.resultTop}><strong>Compression complete</strong><small>{pretty(size)}</small></div><div className={styles.saved}>{saved > 0 ? `${saved}% smaller` : "Optimized file ready"}</div><a className={styles.download} href={out} download="fameorbit-compressed.jpg">Download JPEG ↓</a></div>}
        </div>
      </div>
      <div className={styles.privacy}>🔒 <strong>Private by default.</strong> Your image stays on this device.</div>
    </section>
    <section className={styles.related}><div className={styles.eyebrow}>KEEP GOING</div><div className={styles.relatedGrid}><Link href="/image-resizer/"><strong>Resize image ↗</strong><small>Change pixel dimensions.</small></Link><Link href="/image-converter/"><strong>Convert image ↗</strong><small>Switch JPG, PNG or WebP.</small></Link><Link href="/image-cropper/"><strong>Crop image ↗</strong><small>Trim before you export.</small></Link></div></section>
  </main>;
}
