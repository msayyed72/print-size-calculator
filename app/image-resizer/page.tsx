"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./resizer.module.css";

const formatNames: Record<string, string> = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "image/webp": "WebP",
};

const formatExtensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [original, setOriginal] = useState({ width: 0, height: 0 });
  const [w, setW] = useState(1200);
  const [h, setH] = useState(800);
  const [lockRatio, setLockRatio] = useState(true);
  const [format, setFormat] = useState("image/jpeg");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const ratio = original.width && original.height ? original.width / original.height : 1;

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (out) URL.revokeObjectURL(out);
    };
  }, [preview, out]);

  const load = (f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    setError("");
    setOut("");
    const u = URL.createObjectURL(f);
    const image = new Image();
    image.onload = () => {
      setFile(f);
      setPreview(u);
      setOriginal({ width: image.naturalWidth, height: image.naturalHeight });
      setW(image.naturalWidth);
      setH(image.naturalHeight);
    };
    image.onerror = () => {
      URL.revokeObjectURL(u);
      setError("This image could not be read.");
    };
    image.src = u;
  };

  const choose = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) load(selected);
  };

  const changeWidth = (value: number) => {
    const next = Math.max(1, value || 1);
    setW(next);
    if (lockRatio) setH(Math.max(1, Math.round(next / ratio)));
  };

  const changeHeight = (value: number) => {
    const next = Math.max(1, value || 1);
    setH(next);
    if (lockRatio) setW(Math.max(1, Math.round(next * ratio)));
  };

  const resize = () => {
    if (!file) return;
    setError("");
    if (out) URL.revokeObjectURL(out);
    const u = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(w));
      canvas.height = Math.max(1, Math.round(h));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(u);
        setError("Your browser cannot create the resized image.");
        return;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(u);
        if (blob) setOut(URL.createObjectURL(blob));
        else setError("Could not create the resized image.");
      }, format, format === "image/png" ? undefined : 0.92);
    };
    image.onerror = () => {
      URL.revokeObjectURL(u);
      setError("Invalid image.");
    };
    image.src = u;
  };

  const downloadName = `fameorbit-resized-${w}x${h}.${formatExtensions[format]}`;

  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <Link className={styles.brand} href="/"><strong>Fame</strong>Orbit</Link>
        <div className={styles.navRight}>
          <Link className={styles.back} href="/">All tools</Link>
          <span className={styles.tag}>IMAGE RESIZER</span>
        </div>
      </header>

      <section className={styles.main}>
        <div className={styles.eyebrow}>IMAGE TOOL · 100% LOCAL</div>
        <h1 className={styles.title}>Resize your <em>image.</em></h1>
        <p className={styles.intro}>Set exact pixel dimensions in seconds. Your image stays on your device — nothing is uploaded.</p>

        <div className={styles.workspace}>
          {!file ? (
            <label
              className={`${styles.dropzone} ${drag ? styles.drag : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files?.[0]; if (f) load(f); }}
            >
              <input ref={inputRef} className={styles.hiddenInput} type="file" accept="image/*" onChange={choose} />
              <span className={styles.dropInner}>
                <span className={styles.uploadIcon}>↑</span>
                <span className={styles.dropTitle}>Drop your image here</span>
                <span className={styles.dropText}>or click to choose an image</span>
                <span className={styles.dropFormats}>JPG · PNG · WebP</span>
              </span>
            </label>
          ) : (
            <div className={styles.fileCard}>
              <img className={styles.thumb} src={preview} alt="Selected image preview" />
              <div className={styles.fileInfo}>
                <div className={styles.fileName}>{file.name}</div>
                <div className={styles.fileMeta}>{original.width} × {original.height} px · {(file.size / 1024).toFixed(0)} KB</div>
              </div>
              <button className={styles.change} onClick={() => inputRef.current?.click()}>Change</button>
              <input ref={inputRef} className={styles.hiddenInput} type="file" accept="image/*" onChange={choose} />
            </div>
          )}

          {file && (
            <div className={styles.settings}>
              <div className={styles.settingsTitle}>Resize settings</div>
              <div className={styles.grid}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Width · px</span>
                  <input className={styles.input} type="number" min="1" value={w} onChange={(e) => changeWidth(Number(e.target.value))} />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Height · px</span>
                  <input className={styles.input} type="number" min="1" value={h} onChange={(e) => changeHeight(Number(e.target.value))} />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Output format</span>
                  <select className={styles.select} value={format} onChange={(e) => setFormat(e.target.value)}>
                    <option value="image/jpeg">JPG</option>
                    <option value="image/png">PNG</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </label>
                <label className={styles.ratio}>
                  <input className={styles.checkbox} type="checkbox" checked={lockRatio} onChange={(e) => setLockRatio(e.target.checked)} />
                  Lock aspect ratio
                </label>
              </div>
              <div className={styles.actions}>
                <button className={styles.primary} onClick={resize}>Resize image →</button>
              </div>
              {error && <p className={styles.error}>{error}</p>}
            </div>
          )}

          {out && (
            <div className={styles.result}>
              <span className={styles.resultIcon}>✓</span>
              <div className={styles.resultText}>
                <div className={styles.resultLabel}>Ready to download</div>
                <div className={styles.resultTitle}>{w} × {h} px · {formatNames[format]}</div>
              </div>
              <a className={styles.download} href={out} download={downloadName}>Download image ↓</a>
            </div>
          )}
        </div>

        <div className={styles.privacy}>🔒 <strong>Private by default.</strong> Processing happens entirely in your browser.</div>

        <section className={styles.related}>
          <div className={styles.relatedHead}>
            <div><div className={styles.relatedEyebrow}>Continue working</div><h2 className={styles.relatedTitle}>More image tools</h2></div>
          </div>
          <div className={styles.relatedGrid}>
            <Link className={styles.relatedCard} href="/image-compressor/"><strong>Compress Image</strong><span>Reduce file size</span></Link>
            <Link className={styles.relatedCard} href="/image-converter/"><strong>Convert Image</strong><span>JPG · PNG · WebP</span></Link>
            <Link className={styles.relatedCard} href="/image-cropper/"><strong>Crop Image</strong><span>Cut to the exact area</span></Link>
          </div>
        </section>
      </section>

      <footer className={styles.foot}>FameOrbit · Small tools. Done properly.</footer>
    </main>
  );
}
