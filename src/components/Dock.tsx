import { useEffect, useState } from 'react';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';

// same order as the sections in App. change one, change the other, or the highlight is wrong
const itemIds = ['home', 'about', 'experience', 'projects', 'education', 'contact'] as const;

function Icon({ id }: { id: string }) {
  const common = { className: 'h-4 w-4', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 1.8 };
  if (id === 'home') {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5Z" />
      </svg>
    );
  }
  if (id === 'about') {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      </svg>
    );
  }
  if (id === 'experience') {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5M4 19h16M8 15l3-4 3 2 4-6" />
      </svg>
    );
  }
  if (id === 'education') {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 9 12 4 2 9l10 5 10-5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" />
      </svg>
    );
  }
  if (id === 'projects') {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4V6Zm0 0 8 7 8-7" />
    </svg>
  );
}

const Dock = () => {
  const { theme, toggleTheme, motionPaused, toggleMotion } = useTheme();
  const { locale, copy, toggleLocale } = useI18n();
  const items = itemIds.map((id) => ({ id, label: copy.nav[id] }));
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // current section = the last one whose top has passed about a third of the screen
  // ids don't change with the language, so this doesn't need to re-subscribe
  useEffect(() => {
    const updateActive = () => {
      const marker = window.innerHeight * 0.35;
      let current: (typeof itemIds)[number] = itemIds[0];
      for (const id of itemIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) current = id;
      }
      setActive(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', closeOnDesktop);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, []);

  const linkClass = (id: string, layout: 'dock' | 'menu') => {
    const current = active === id;
    if (layout === 'menu') {
      return `flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush ${
        current ? 'bg-blush/15 text-blush' : 'hover:bg-white/5'
      }`;
    }
    return `flex flex-1 flex-col items-center rounded-full px-2 py-2 text-[11px] font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm ${
      current ? 'bg-white/25' : 'hover:bg-white/10'
    }`;
  };

  return (
    <>
    {menuOpen && (
      <button
        type="button"
        aria-label={copy.a11y.closeMenu}
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={() => setMenuOpen(false)}
      />
    )}
    {menuOpen && (
      <nav
        aria-label={copy.a11y.sections}
        className="glass fixed inset-x-4 bottom-24 z-50 rounded-3xl p-3 lg:hidden"
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? 'true' : undefined}
            className={linkClass(item.id, 'menu')}
            onClick={() => setMenuOpen(false)}
          >
            <Icon id={item.id} />
            {item.label}
          </a>
        ))}
      </nav>
    )}
    {/* pill from lg (1024) up. burger, pause, language and theme stay visible under that */}
    <div className="fixed bottom-4 left-1/2 z-50 flex w-auto -translate-x-1/2 items-center gap-2 lg:w-[min(96vw,54rem)]">
      <nav className="hidden min-w-0 flex-1 items-center justify-between gap-1 rounded-full bg-gradient-to-r from-blush via-fuchsia-600 to-cyan-400 p-2 shadow-[0_10px_40px_rgba(255,77,141,0.35)] lg:flex">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? 'true' : undefined}
            className={linkClass(item.id, 'dock')}
          >
            <Icon id={item.id} />
            <span className="mt-0.5 whitespace-nowrap">{item.label}</span>
          </a>
        ))}
      </nav>
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? copy.a11y.closeMenu : copy.a11y.openMenu}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
      >
        {menuOpen ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>
      <button
        type="button"
        onClick={toggleMotion}
        aria-pressed={motionPaused}
        aria-label={motionPaused ? copy.a11y.play : copy.a11y.pause}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {motionPaused ? (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7L8 5Z" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 5h4v14H6V5Zm8 0h4v14h-4V5Z" />
          </svg>
        )}
      </button>
      <button
        type="button"
        onClick={toggleLocale}
        aria-label={locale === 'en' ? copy.a11y.toFrench : copy.a11y.toEnglish}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/70 text-xs font-bold tracking-wide text-white backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {locale === 'en' ? 'FR' : 'EN'}
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? copy.a11y.light : copy.a11y.dark}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {theme === 'dark' ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2m14 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z" />
          </svg>
        )}
      </button>
    </div>
    </>
  );
};

export default Dock;
