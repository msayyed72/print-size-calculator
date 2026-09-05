"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./typing.module.css";

const passages = [
  "Good tools should feel simple fast and useful. Focus on the task and let the interface stay out of the way.",
  "Practice typing with accuracy first then build speed through steady and consistent repetition.",
  "Small improvements become habits when you practice with focus and measure your progress over time.",
];

const durations = [15, 30, 60];

export default function TypingTest() {
  const [passage, setPassage] = useState(passages[0]);
  const [typed, setTyped] = useState("");
  const [duration, setDuration] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const correct = useMemo(
    () => [...typed].filter((char, index) => char === passage[index]).length,
    [typed, passage]
  );
  const errors = Math.max(0, typed.length - correct);
  const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 100;
  const wpm = seconds ? Math.round(correct / 5 / (seconds / 60)) : 0;
  const remaining = Math.max(0, duration - seconds);

  useEffect(() => {
    if (!started || finished) return;
    const timer = window.setInterval(() => {
      setSeconds((current) => {
        const next = current + 1;
        if (next >= duration) setFinished(true);
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [started, finished, duration]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [passage, finished]);

  function restart(nextPassage = false) {
    if (nextPassage) {
      const choices = passages.filter((item) => item !== passage);
      setPassage(choices[Math.floor(Math.random() * choices.length)] || passages[0]);
    }
    setTyped("");
    setSeconds(0);
    setStarted(false);
    setFinished(false);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  function handleInput(value: string) {
    if (finished) return;
    const next = value.slice(0, passage.length);
    if (!started) setStarted(true);
    setTyped(next);
    if (next.length >= passage.length) setFinished(true);
  }

  return (
    <main>
      <section className={styles.studio}>
        <div className={styles.topbar}>
          <Link className={styles.back} href="/">← FameOrbit</Link>
          <Link className={styles.back} href="/word-counter/">Word Counter →</Link>
        </div>

        <div className={styles.eyebrow}>TYPING TEST</div>
        <h1 className={styles.title}>Type fast. Stay <em>accurate.</em></h1>
        <p className={styles.intro}>
          A distraction-free typing test with live speed, accuracy and error feedback. Your text stays in your browser.
        </p>

        <section className={styles.shell} onClick={() => inputRef.current?.focus()}>
          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <span className={styles.controlLabel}>TIME</span>
              {durations.map((value) => (
                <button
                  key={value}
                  className={`${styles.control} ${duration === value ? styles.active : ""}`}
                  onClick={(event) => { event.stopPropagation(); setDuration(value); restart(); }}
                >
                  {value}s
                </button>
              ))}
            </div>
            <div className={styles.controlGroup}>
              <button className={styles.control} onClick={(event) => { event.stopPropagation(); restart(true); }}>
                New passage
              </button>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}><span className={styles.statLabel}>WPM</span><strong className={styles.statValue}>{wpm}</strong></div>
            <div className={styles.stat}><span className={styles.statLabel}>ACCURACY</span><strong className={styles.statValue}>{accuracy}%</strong></div>
            <div className={styles.stat}><span className={styles.statLabel}>TIME</span><strong className={styles.statValue}>{started ? remaining : duration}s</strong></div>
            <div className={styles.stat}><span className={styles.statLabel}>ERRORS</span><strong className={styles.statValue}>{errors}</strong></div>
          </div>

          <div className={styles.typingArea}>
            <div className={styles.prompt} aria-label="Typing passage">
              {[...passage].map((char, index) => {
                const typedChar = typed[index];
                const className = typedChar === undefined
                  ? index === typed.length ? styles.current : ""
                  : typedChar === char ? styles.correct : styles.wrong;
                return <span key={`${index}-${char}`} className={className}>{char}</span>;
              })}
            </div>
            <input
              ref={inputRef}
              className={styles.input}
              value={typed}
              onChange={(event) => handleInput(event.target.value)}
              disabled={finished}
              autoFocus
              aria-label="Type the passage"
            />
            <div className={styles.hint}>
              {finished ? "Test complete — press restart to go again." : started ? "Keep going…" : "Click anywhere in the test and start typing."}
            </div>
          </div>

          {finished && (
            <div className={styles.result}>
              <div><span className={styles.resultLabel}>SPEED</span><strong className={styles.resultValue}>{wpm} WPM</strong></div>
              <div><span className={styles.resultLabel}>ACCURACY</span><strong className={styles.resultValue}>{accuracy}%</strong></div>
              <div><span className={styles.resultLabel}>ERRORS</span><strong className={styles.resultValue}>{errors}</strong></div>
            </div>
          )}

          <div className={styles.actions}>
            <button className={styles.primary} onClick={(event) => { event.stopPropagation(); restart(); }}>
              Restart
            </button>
            <button className={styles.secondary} onClick={(event) => { event.stopPropagation(); restart(true); }}>
              New passage
            </button>
          </div>
        </section>

        <div className={styles.below}>
          <article className={styles.card}>
            <h2>Built for focused practice.</h2>
            <p>FameOrbit measures WPM using the standard five-character convention and gives immediate feedback when you make a mistake. Start with accuracy, then push your speed.</p>
          </article>
          <article className={styles.card}>
            <h2>Quick controls</h2>
            <p><span className={styles.kbd}>Click</span> to focus · <span className={styles.kbd}>Tab</span> to navigate · choose 15, 30 or 60 seconds before a run.</p>
          </article>
        </div>
        <div className={styles.privacy}>🔒 Private by default · Nothing is uploaded to FameOrbit.</div>
      </section>
    </main>
  );
}
