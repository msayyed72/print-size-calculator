"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [remaining, setRemaining] = useState(300);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setRemaining((r) => {
      if (r <= 1) { setRunning(false); return 0; }
      return r - 1;
    }), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const setTimer = () => setRemaining(Math.max(0, minutes * 60 + seconds));
  const format = (s:number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  return <main><header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><span className="headerTag">COUNTDOWN</span></header><section className="toolPage"><div className="eyebrow">TIME TOOL</div><h1>Countdown <em>Timer</em></h1><p className="toolIntro">Set a duration and start a clean countdown timer in your browser.</p><div className="calculatorCard"><div className="bigResult">{format(remaining)}</div><div className="formGrid"><label className="toolLabel">Minutes<input className="toolInput" type="number" min="0" value={minutes} onChange={e=>setMinutes(Math.max(0,Number(e.target.value)||0))}/></label><label className="toolLabel">Seconds<input className="toolInput" type="number" min="0" max="59" value={seconds} onChange={e=>setSeconds(Math.min(59,Math.max(0,Number(e.target.value)||0)))}/></label></div><div className="buttonRow"><button className="primaryButton" onClick={()=>setRunning(!running)} disabled={remaining===0}>{running?"Pause":"Start"}</button><button className="secondaryButton" onClick={setTimer}>Set</button><button className="secondaryButton" onClick={()=>{setRunning(false);setTimer();}}>Reset</button></div></div><h2>How to use</h2><p>Choose minutes and seconds, press Set, then Start. The timer stays in your browser and does not upload anything.</p><p><Link href="/">← Back to FameOrbit</Link></p></section></main>;
}