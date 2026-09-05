"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AdSlot from "../components/AdSlot";
import styles from "./ruler.module.css";

export default function OnlineRuler(){
 const [pixelsPerCm,setPixelsPerCm]=useState(37.8);const [calibrated,setCalibrated]=useState(false);const [cm,setCm]=useState(10);const [unit,setUnit]=useState<"cm"|"in">("cm");
 useEffect(()=>{const saved=Number(localStorage.getItem("fameorbit-ruler-ppcm"));if(saved>10){setPixelsPerCm(saved);setCalibrated(true)}},[]);
 const px=cm*pixelsPerCm;const display=unit==="cm"?cm:cm/2.54;
 const rulerUnit=unit==="cm"?1:2.54;
 const totalUnits=unit==="cm"?Math.max(2,Math.ceil(cm)):Math.max(2,Math.ceil(cm/2.54));
 const rulerWidth=Math.max(420,Math.min(px,1400));
 const tickCount=totalUnits*10;
 const ticks=useMemo(()=>Array.from({length:tickCount+1},(_,i)=>i),[tickCount]);
 const calibrate=()=>{const value=prompt("Measure a known 10 cm object against your screen and enter its pixel width:",String(Math.round(pixelsPerCm*10)));const n=Number(value);if(n>0){const p=n/10;setPixelsPerCm(p);setCalibrated(true);localStorage.setItem("fameorbit-ruler-ppcm",String(p))}};
 const updateLength=(value:string)=>{const n=Number(value);if(Number.isFinite(n)&&n>0)setCm(unit==="cm"?Math.min(n,36):Math.min(n*2.54,91.44))};
 return <main>
  <header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><nav><Link href="/">All tools</Link><Link href="/qr-code-generator/">QR Generator</Link><Link href="/percentage-calculator/">Calculators</Link></nav><span className="headerTag">EVERYDAY · MEASUREMENT</span></header>
  <section className="hero"><div className="eyebrow">MEASURE ON SCREEN</div><h1>A ruler that<br/><em>lives in your browser.</em></h1><p className="lead">A real visual scale with centimetre and inch markings. Calibrate once for a closer physical match.</p>
   <div className="panel custom">
    <div className="typingTop"><div><span className="small">SCREEN RULER</span><h2>{calibrated?"Calibrated display":"Quick estimate"}</h2></div><span className={`status ${calibrated?"excellent":""}`}>{calibrated?"CALIBRATED":"ESTIMATE"}</span></div>
    <div className={styles.rulerToolbar}><div className={styles.unitSwitch}><button className={unit==="cm"?styles.active:""} onClick={()=>setUnit("cm")}>cm</button><button className={unit==="in"?styles.active:""} onClick={()=>setUnit("in")}>in</button></div><button className={styles.secondaryAction} onClick={calibrate}>Calibrate</button></div>
    <div className={styles.rulerHeader}><span className={styles.measureBadge}><i className={styles.measureDot}/>{display.toFixed(1)} {unit}</span><span className={styles.rulerHint}>Scroll horizontally on smaller screens</span></div>
    <div className={styles.rulerViewport} aria-label={`Visual ruler showing ${display.toFixed(1)} ${unit}`}><div className={styles.ruler} style={{width:`${rulerWidth}px`}}>
      {ticks.map(i=>{const major=i%10===0;const mid=i%5===0&&!major;const position=(i/tickCount)*100;return <span key={i} className={`${styles.tick} ${major?styles.tickMajor:""} ${mid?styles.tickMid:""}`} style={{left:`${position}%`}}>{major&&<b className={`${styles.tickLabel} ${i===0?styles.zero:""}`}>{(i/10).toFixed(unit==="cm"?0:1)}</b>}</span>})}
    </div></div>
    <label className="toolLabel">LENGTH ({unit.toUpperCase()})<input className="toolInput" type="number" min="0.1" max="36" step="0.1" value={display.toFixed(1)} onChange={e=>updateLength(e.target.value)}/></label>
    <div className="customResult"><strong>{display.toFixed(1)} {unit}</strong><span className="status">{Math.round(px)} px</span><p>{calibrated?"Based on your saved screen calibration.":"Calibrate for a more accurate physical measurement."}</p></div>
   </div>
  </section><AdSlot placement="after-calculator"/><section className="contentSection"><div className="contentInner"><div className="eyebrow">CALIBRATION</div><h2>Make the screen match reality.</h2><p>Browsers cannot automatically know the physical size of your display. FameOrbit lets you compare the ruler with a known object, save the result locally, and reuse it on future visits.</p><div className="guideGrid"><article><h3>1. Use 100% zoom</h3><p>Keep browser zoom at 100% before calibrating so the scale is not altered.</p></article><article><h3>2. Match a known size</h3><p>Use a physical ruler or a known-size object and enter the measured pixel length.</p></article><article><h3>3. Measure</h3><p>Place your object against the visible scale and switch between centimetres and inches as needed.</p></article></div></div></section><footer><span>FameOrbit · Online Ruler</span><Link href="/">Explore all tools</Link></footer>
 </main>
}
