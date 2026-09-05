"use client";
import Link from "next/link";import{useEffect,useRef,useState}from"react";import styles from"./converter.module.css";
const formats=[{value:"image/png",name:"PNG",note:"Lossless"},{value:"image/jpeg",name:"JPEG",note:"Small photos"},{value:"image/webp",name:"WebP",note:"Modern web"}];
const ext=(type:string)=>type==="image/png"?"png":type==="image/webp"?"webp":"jpg";
const pretty=(bytes:number)=>bytes<1024*1024?`${(bytes/1024).toFixed(0)} KB`:`${(bytes/1024/1024).toFixed(2)} MB`;
export default function ImageConverter(){
 const[file,setFile]=useState<File|null>(null);const[preview,setPreview]=useState("");const[format,setFormat]=useState("image/webp");const[quality,setQuality]=useState("0.9");const[out,setOut]=useState("");const[outSize,setOutSize]=useState(0);const[error,setError]=useState("");const[drag,setDrag]=useState(false);const inputRef=useRef<HTMLInputElement>(null);
 const sameFormat=!!file&&file.type===format;
 useEffect(()=>()=>{if(preview)URL.revokeObjectURL(preview);if(out)URL.revokeObjectURL(out)},[preview,out]);
 const choose=(f:File|null)=>{if(!f)return;setFile(f);setPreview(URL.createObjectURL(f));setOut("");setOutSize(0);setError("");const preferred=f.type==="image/png"?"image/webp":f.type==="image/webp"?"image/jpeg":"image/webp";setFormat(preferred)};
 const convert=()=>{if(!file)return;if(sameFormat){setError(`This image is already ${formats.find(f=>f.value===format)?.name}. Choose another format.`);return}setError("");const img=new Image();const url=URL.createObjectURL(file);img.onload=()=>{const c=document.createElement("canvas");c.width=img.naturalWidth;c.height=img.naturalHeight;const ctx=c.getContext("2d");if(!ctx){URL.revokeObjectURL(url);setError("Canvas is not available in this browser.");return}ctx.drawImage(img,0,0);c.toBlob(blob=>{URL.revokeObjectURL(url);if(!blob){setError("This image could not be converted.");return}setOut(URL.createObjectURL(blob));setOutSize(blob.size)},format,format==="image/png"?undefined:Number(quality))};img.onerror=()=>{URL.revokeObjectURL(url);setError("Unsupported or invalid image file.")};img.src=url};
 return <main className={styles.page}>
  <header className={styles.header}><Link className={styles.brand} href="/"><strong>Fame</strong>Orbit</Link><span className={styles.headerTag}>IMAGE CONVERTER</span></header>
  <section className={styles.hero}><div className={styles.eyebrow}>IMAGE TOOL</div><h1>Convert images<br/><em>without the clutter.</em></h1><p className={styles.intro}>Change PNG, JPEG and WebP in seconds. Everything runs locally in your browser.</p>
   <div className={styles.workspace}>
    <div className={styles.card}>
     <label className={`${styles.drop} ${drag?styles.drag:""}`} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);choose(e.dataTransfer.files?.[0]||null)}}>
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={e=>choose(e.target.files?.[0]||null)}/><div><div className={styles.dropIcon}>↑</div><strong>{file?"Replace image":"Drop your image here"}</strong><span>{file?"Choose another file or drag one over":"or click to browse · PNG, JPEG, WebP"}</span></div>
     </label>
     {file&&<div className={styles.fileCard}><img className={styles.preview} src={preview} alt="Selected image preview"/><div><div className={styles.fileName}>{file.name}</div><div className={styles.fileMeta}>{pretty(file.size)} · {file.type.replace("image/","").toUpperCase()}</div></div><button type="button" className={styles.change} onClick={()=>inputRef.current?.click()}>Change</button></div>}
    </div>
    <div className={styles.card}><div className={styles.controls}>
      <div><div className={styles.label}>OUTPUT FORMAT</div><div className={styles.formatGrid}>{formats.map(f=><button type="button" key={f.value} className={`${styles.format} ${format===f.value?styles.formatActive:""} ${file&&f.value===file.type?styles.formatDisabled:""}`} disabled={!!file&&f.value===file.type} onClick={()=>setFormat(f.value)}><strong>{f.name}</strong><small>{f.note}</small></button>)}</div></div>
      {sameFormat&&<div className={styles.notice}><strong>Already {formats.find(f=>f.value===format)?.name}</strong>This file is already in the selected format. Pick another format to actually convert it.</div>}
      <div><div className={styles.sliderRow}><span className={styles.label}>QUALITY</span><span className={styles.sliderValue}>{format==="image/png"?"Lossless":`${Math.round(Number(quality)*100)}%`}</span></div><input className={styles.range} type="range" min="0.5" max="1" step="0.05" value={quality} disabled={format==="image/png"} onChange={e=>setQuality(e.target.value)}/></div>
      <button type="button" className={styles.button} onClick={convert} disabled={!file||sameFormat}>{sameFormat?"Choose a different format":"Convert image"}</button>
      {error&&<p className={styles.error}>{error}</p>}
      {out&&<div className={styles.result}><div className={styles.resultTop}><strong>Conversion complete</strong><small>{pretty(outSize)} · {formats.find(f=>f.value===format)?.name}</small></div><a className={styles.download} href={out} download={`fameorbit-converted.${ext(format)}`}>Download {ext(format).toUpperCase()} ↗</a></div>}
      <div className={styles.privacy}><i className={styles.privacyDot}/>Your image stays on your device. No upload required.</div>
    </div></div>
   </div>
  </section>
  <section className={styles.related}><div className={styles.eyebrow}>KEEP GOING</div><div className={styles.relatedGrid}><Link href="/image-compressor/"><strong>Compress image ↗</strong><small>Reduce file size after converting.</small></Link><Link href="/image-resizer/"><strong>Resize image ↗</strong><small>Change dimensions without leaving the browser.</small></Link><Link href="/image-cropper/"><strong>Crop image ↗</strong><small>Trim the image before exporting.</small></Link></div></section>
 </main>;
}