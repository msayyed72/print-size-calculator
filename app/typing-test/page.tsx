"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import AdSlot from "../components/AdSlot";

const samples=[
 "The quick brown fox jumps over the lazy dog while the morning sun warms the quiet street.",
 "Good tools should feel simple, fast and useful. Focus on the task and let the interface stay out of the way.",
 "Practice typing with accuracy first, then build speed through steady and consistent repetition."
];

export default function TypingTest(){
 const [sample,setSample]=useState(samples[0]);const [typed,setTyped]=useState("");const [started,setStarted]=useState(false);const [finished,setFinished]=useState(false);const [seconds,setSeconds]=useState(0);const inputRef=useRef<HTMLTextAreaElement>(null);
 useEffect(()=>{if(!started||finished)return;const timer=window.setInterval(()=>setSeconds(s=>s+1),1000);return()=>window.clearInterval(timer)},[started,finished]);
 const correct=useMemo(()=>[...typed].filter((c,i)=>c===sample[i]).length,[typed,sample]);const accuracy=typed.length?Math.round(correct/typed.length*100):100;const wpm=seconds?Math.round(correct/5/(seconds/60)):0;
 function change(value:string){if(!started)setStarted(true);setTyped(value);if(value.length>=sample.length)setFinished(true)}
 function reset(){setTyped("");setStarted(false);setFinished(false);setSeconds(0);setTimeout(()=>inputRef.current?.focus(),0)}
 function next(){setSample(samples[Math.floor(Math.random()*samples.length)]);setTyped("");setStarted(false);setFinished(false);setSeconds(0);setTimeout(()=>inputRef.current?.focus(),0)}
 return <main>
  <header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><nav><Link href="/">All tools</Link><Link href="/word-counter/">Word Counter</Link><Link href="/character-counter/">Character Counter</Link></nav><span className="headerTag">PRODUCTIVITY · TYPING</span></header>
  <section className="hero"><div className="eyebrow">SPEED + ACCURACY</div><h1>Type faster.<br/><em>Know your score.</em></h1><p className="lead">A focused typing test with live WPM, accuracy and instant results. No account, no distractions.</p>
   <div className="panel custom typingPanel"><div className="typingTop"><div><span className="small">LIVE TEST</span><h2>{finished?"Test complete":"Start typing"}</h2></div><span className="status">{started&&!finished?"RUNNING":"READY"}</span></div><div className="typingStats"><div><span>WPM</span><strong>{wpm}</strong></div><div><span>ACCURACY</span><strong>{accuracy}%</strong></div><div><span>TIME</span><strong>{seconds}s</strong></div><div><span>CHARACTERS</span><strong>{typed.length}</strong></div></div><div className="typingPrompt">{[...sample].map((char,i)=><span key={i} className={i<typed.length?(typed[i]===char?"typedCorrect":"typedWrong"):""}>{char}</span>)}</div><textarea ref={inputRef} className="toolTextarea typingInput" rows={5} value={typed} onChange={e=>change(e.target.value.slice(0,sample.length))} disabled={finished} placeholder="Click here and start typing…" autoFocus />{finished&&<div className="customResult"><strong>{wpm} WPM · {accuracy}%</strong><span className="status excellent">Complete</span><p>{accuracy>=95?"Excellent accuracy. Now try to beat your speed.":"Good run. Keep accuracy high and try again."}</p></div>}<div className="heroActions"><button className="primaryAction" onClick={reset}>Restart test</button><button className="secondaryAction" onClick={next}>New passage</button></div></div>
  </section><AdSlot placement="after-calculator"/><section className="contentSection"><div className="contentInner"><div className="eyebrow">YOUR SCORE</div><h2>Speed is useful. Accuracy makes it real.</h2><p>FameOrbit measures typing speed using the standard five-character word convention while tracking character accuracy in real time.</p><div className="guideGrid"><article><h3>WPM</h3><p>Words per minute estimates how many standard five-character words you can type in one minute.</p></article><article><h3>Accuracy</h3><p>Accuracy compares each typed character with the target passage, so mistakes are visible immediately.</p></article><article><h3>Practice</h3><p>Run short tests regularly. Aim for consistent accuracy first, then push your speed.</p></article></div></div></section><footer><span>FameOrbit · Typing Test</span><Link href="/">Explore all tools</Link></footer>
 </main>
}
