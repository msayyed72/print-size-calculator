"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdSlot from "../components/AdSlot";

export default function OnlineRuler() {
  const [pixelsPerCm, setPixelsPerCm] = useState(37.8);
  const [calibrated, setCalibrated] = useState(false);
  const [cm, setCm] = useState(10);
  useEffect(() => { const saved=Number(localStorage.getItem("fameorbit-ruler-ppcm")); if(saved>10) {setPixelsPerCm(saved);setCalibrated(true);} }, []);
  const calibrate = () => { const value=prompt("Enter the measured pixel width of a 10 cm object on your screen:", String(Math.round(pixelsPerCm*10))); const px=Number(value); if(px>0){const p=px/10;setPixelsPerCm(p);setCalibrated(true);localStorage.setItem("fameorbit-ruler-ppcm",String(p));} };
  return <main>
    <header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><span className="headerTag">EVERYDAY TOOL · ONLINE RULER</span></header>
    <section className="hero"><div className="eyebrow">MEASURE ON SCREEN</div><h1>An online ruler,<br/><em>right in your browser.</em></h1><p className="lead">Use the on-screen scale for quick measurements. Calibrate it against a known object for better accuracy.</p><div className="panel custom"><div className="panelHead"><h2>Screen ruler</h2><p>{calibrated ? "Calibrated for this browser." : "Default scale — calibrate for your display."}</p></div><div className="rulerWrap"><div className="rulerScale" style={{width:`${Math.min(cm*pixelsPerCm,900)}px`}}>{Array.from({length:11},(_,i)=><span key={i} style={{left:`${i*10}%`}}>{i}</span>)}</div></div><label className="toolLabel">LENGTH (CM)<input className="toolInput" type="number" min="1" max="24" value={cm} onChange={e=>setCm(Number(e.target.value)||1)}/></label><div className="customResult"><strong>{cm.toFixed(1)} cm</strong><span className="status">{(cm*pixelsPerCm).toFixed(0)} px</span><p>Approximate on-screen length.</p></div><button className="primaryAction fullAction" onClick={calibrate}>Calibrate ruler</button></div></section><AdSlot placement="after-calculator"/><section className="contentSection"><div className="contentInner"><div className="eyebrow">ACCURACY TIPS</div><h2>How to calibrate an online ruler.</h2><p>Screen sizes and browser zoom levels vary, so a web ruler cannot know your physical display scale automatically. Compare it with a known 10 cm object such as a bank card or ruler, then enter the measured pixel width.</p><div className="guideGrid"><article><h3>Use 100% zoom</h3><p>Keep your browser zoom at 100% before calibrating for a more consistent result.</p></article><article><h3>Calibrate once</h3><p>Your calibration is saved locally in this browser so you can reuse it.</p></article><article><h3>Quick checks</h3><p>For precision work, use a physical ruler or calibrated measuring device instead of a screen estimate.</p></article></div></div></section><footer><span>FameOrbit · Online Ruler</span><Link href="/">Explore all FameOrbit tools</Link></footer>
  </main>;
}
