"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const startedAt = useRef(0);
  const base = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setElapsed(base.current + Date.now() - startedAt.current), 50);
    return () => window.clearInterval(id);
  }, [running]);

  const toggle = () => {
    if (running) {
      base.current = elapsed;
      setRunning(false);
    } else {
      startedAt.current = Date.now();
      setRunning(true);
    }
  };

  const reset = () => {
    setRunning(false); setElapsed(0); setLaps([]); base.current = 0;
  };

  const lap = () => setLaps((x) => [elapsed, ...x]);
  const format = (ms: number) => `${String(Math.floor(ms / 60000)).padStart(2,"0")}:${String(Math.floor(ms / 1000) % 60).padStart(2,"0")}.${String(Math.floor(ms / 10) % 100).padStart(2,"0")}`;

  return <main><header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><span className="headerTag">STOPWATCH</span></header><section className="toolPage"><div className="eyebrow">TIME TOOL</div><h1>Online <em>Stopwatch</em></h1><p className="toolIntro">A simple, accurate stopwatch with laps. Runs directly in your browser.</p><div className="calculatorCard"><div className="bigResult">{format(elapsed)}</div><div className="buttonRow"><button className="primaryButton" onClick={toggle}>{running ? "Pause" : "Start"}</button><button className="secondaryButton" onClick={lap} disabled={!running}>Lap</button><button className="secondaryButton" onClick={reset}>Reset</button></div>{laps.length > 0 && <div className="resultBox"><strong>Laps</strong>{laps.map((l,i)=><div key={i} className="resultRow"><span>Lap {laps.length-i}</span><strong>{format(l)}</strong></div>)}</div>}</div><h2>How to use</h2><p>Press Start to begin timing, Lap to record split times, and Reset to clear the stopwatch. Timing happens locally in your browser.</p><p><Link href="/">← Back to FameOrbit</Link></p></section></main>;
}