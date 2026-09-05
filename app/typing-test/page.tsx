"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AdSlot from "../components/AdSlot";

const samples = [
  "The quick brown fox jumps over the lazy dog while the morning sun warms the quiet street.",
  "Good tools should feel simple, fast and useful. Focus on the task and let the interface stay out of the way.",
  "Practice typing with accuracy first, then build speed through steady and consistent repetition.",
];

export default function TypingTest() {
  const [sample, setSample] = useState(samples[0]);
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!started || finished) return;
    const timer = window.setInterval(() => setSeconds(s => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, [started, finished]);

  const correct = useMemo(() => [...typed].filter((c, i) => c === sample[i]).length, [typed, sample]);
  const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 100;
  const wpm = seconds ? Math.round((correct / 5) / (seconds / 60)) : 0;

  function change(value: string) {
    if (!started) setStarted(true);
    setTyped(value);
    if (value.length >= sample.length) setFinished(true);
  }
  function reset() {
    setTyped(""); setStarted(false); setFinished(false); setSeconds(0);
  }
  function next() {
    setSample(samples[Math.floor(Math.random() * samples.length)]); reset();
  }

  return <main>
    <header className="siteHeader"><Link className="brand" href="/"><strong>Fame</strong>Orbit</Link><span className="headerTag">PRODUCTIVITY · TYPING TEST</span></header>
    <section className="hero"><div className="eyebrow">SPEED + ACCURACY</div><h1>How fast<br/><em>can you type?</em></h1><p className="lead">Test your typing speed and accuracy with a clean, distraction-free timer. No account required.</p>
      <div className="panel custom"><div className="typingStats"><div><span>WPM</span><strong>{wpm}</strong></div><div><span>ACCURACY</span><strong>{accuracy}%</strong></div><div><span>TIME</span><strong>{seconds}s</strong></div></div><p className="typingPrompt">{[...sample].map((char, i) => <span key={i} className={i < typed.length ? (typed[i] === char ? "typedCorrect" : "typedWrong") : ""}>{char}</span>)}</p><textarea className="toolTextarea typingInput" rows={5} value={typed} onChange={e=>change(e.target.value.slice(0, sample.length))} disabled={finished} placeholder="Start typing here..." autoFocus />{finished && <div className="customResult"><strong>{wpm} WPM · {accuracy}% accuracy</strong><span className="status excellent">Complete</span><p>Nice work. Try again or use a new passage to beat your score.</p></div>}<div className="heroActions"><button className="primaryAction" onClick={reset}>Restart</button><button className="secondaryAction" onClick={next}>New passage</button></div></div>
    </section><AdSlot placement="after-calculator"/><section className="contentSection"><div className="contentInner"><div className="eyebrow">HOW IT WORKS</div><h2>Build speed without losing accuracy.</h2><p>Typing speed is measured in words per minute (WPM). This test uses the standard five-character word convention and compares your input with the displayed passage.</p><div className="guideGrid"><article><h3>WPM</h3><p>Words per minute estimates how many five-character words you type in one minute.</p></article><article><h3>Accuracy</h3><p>Accuracy shows the percentage of typed characters that match the target text.</p></article><article><h3>Practice</h3><p>Short, consistent practice sessions can help you improve both rhythm and confidence.</p></article></div></div></section><footer><span>FameOrbit · Typing Test</span><Link href="/">Explore all FameOrbit tools</Link></footer>
  </main>;
}
