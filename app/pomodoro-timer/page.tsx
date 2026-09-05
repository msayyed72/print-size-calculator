"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PomodoroTimer() {
  const [mode, setMode] = useState<"focus"|"break">("focus");
  const [remaining, setRemaining] = useState(25*60);
  const [running, setRunning] = useState(false);

  useEffect(()=>{
    if(!running) return;
    const id=window.setInterval(()=>setRemaining(r=>{
      if(r<=1){setRunning(false); return 0;} return r-1;
    }),1000);
    return ()=>window.clearInterval(id);
  },[running]);

  const switchMode=(m:"focus"|"break")=>{setRunning(false);setMode(m);setRemaining(m==="focus"?25*60:5*60);};
  const format=(s:number)=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  return <main><header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><span className="headerTag">POMODORO</span></header><section className="toolPage"><div className="eyebrow">PRODUCTIVITY TOOL</div><h1>Pomodoro <em>Timer</em></h1><p className="toolIntro">Focus for 25 minutes, take a 5-minute break, and keep your work moving.</p><div className="calculatorCard"><div className="buttonRow"><button className={mode==="focus"?"primaryButton":"secondaryButton"} onClick={()=>switchMode("focus")}>Focus 25m</button><button className={mode==="break"?"primaryButton":"secondaryButton"} onClick={()=>switchMode("break")}>Break 5m</button></div><div className="bigResult">{format(remaining)}</div><p className="toolIntro">{mode==="focus"?"Focus session":"Short break"}</p><div className="buttonRow"><button className="primaryButton" onClick={()=>setRunning(!running)} disabled={remaining===0}>{running?"Pause":"Start"}</button><button className="secondaryButton" onClick={()=>{setRunning(false);setRemaining(mode==="focus"?25*60:5*60);}}>Reset</button></div></div><h2>How Pomodoro works</h2><p>Work in focused 25-minute sessions followed by 5-minute breaks. Use the timer to create a simple rhythm without signing in or installing anything.</p><p><Link href="/">← Back to FameOrbit</Link></p></section></main>;
}