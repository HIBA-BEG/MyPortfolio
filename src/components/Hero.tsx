import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import StarsCanvas from './StarsCanvas';
import { useI18n } from '../i18n';

// starts once the stats are on screen, not when the page loads
function useCount(target: number, active: boolean, decimals = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 900;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(target * progress);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return decimals ? value.toFixed(decimals) : Math.round(value).toString();
}

const Hero = () => {
  const { locale, copy } = useI18n();
  // english pdf unless the site is in french. both files live in public/
  const cvFile = locale === 'fr' ? 'hiba-cv-fr.pdf' : 'hiba-cv-en.pdf';
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.6 });
  const [repoCount, setRepoCount] = useState<number | null>(null);
  const years = useCount(1.5, statsInView, 1);
  const projects = useCount(repoCount ?? 0, statsInView && repoCount !== null);

  // live public repo count. 43 is what I had when github was down or rate-limited
  useEffect(() => {
    let cancelled = false;
    fetch('https://api.github.com/users/HIBA-BEG')
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      })
      .then((data: { public_repos?: number }) => {
        if (!cancelled) setRepoCount(typeof data.public_repos === 'number' ? data.public_repos : 43);
      })
      .catch(() => {
        if (!cancelled) setRepoCount(43);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen items-center">
      <StarsCanvas />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-[auto_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80"
        >
          <span className="ring-spin absolute inset-0" />
          <span className="ring-spin ring-spin-2 absolute inset-4" />
          <span className="ring-spin ring-spin-3 absolute inset-8" />
          <img
            src="/hiba3.png"
            alt="Hiba BEGHDI"
            className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover object-[center_18%] shadow-[0_0_40px_rgba(255,77,141,0.35)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-white">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {copy.hero.available}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[var(--text)] sm:text-6xl">
            <span className="block">{copy.hero.greeting}</span>
            <span className="block text-blush">Hiba BEGHDI</span>
          </h1>
          <p className="accent-cyan mt-3 text-lg sm:text-xl">{copy.hero.role}</p>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text)]">
            {copy.hero.engineer}
          </p>
          <p className="mt-4 max-w-xl text-base text-[var(--muted)] sm:text-lg">{copy.hero.bio}</p>

          <div ref={statsRef} className="mt-8 flex gap-8">
            <div>
              <p className="text-2xl font-bold text-[var(--text)]">{years}+</p>
              <p className="text-sm text-[var(--muted)]">{copy.hero.years}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--text)]">{repoCount === null ? '—' : projects}</p>
              <p className="text-sm text-[var(--muted)]">{copy.hero.repos}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--text)]">QA</p>
              <p className="text-sm text-[var(--muted)]">{copy.hero.dev}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`/${cvFile}`}
              download={locale === 'fr' ? 'Hiba-BEGHDI-CV-FR.pdf' : 'Hiba-BEGHDI-CV-EN.pdf'}
              className="inline-flex items-center rounded-full bg-blush px-6 py-3 text-sm font-semibold text-white hover:bg-blush-deep"
            >
              {copy.hero.download}
            </a>
            <a
              href="#contact"
              className="accent-cyan inline-flex items-center rounded-full border border-current px-6 py-3 text-sm font-semibold hover:bg-cyan-300/10"
            >
              {copy.hero.hire}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
