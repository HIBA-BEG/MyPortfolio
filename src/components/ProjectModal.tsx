import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from '../i18n';

export type DemoAccount = {
  label: string;
  email: string;
  password: string;
};

export type ProjectDialog = {
  id: string;
  title: string;
  year?: string;
  technologies: readonly string[];
  demo?: string;
  images: readonly string[];
  description: string;
  details: readonly string[];
  demoAccounts?: readonly DemoAccount[];
  guestHint?: boolean;
};

const overlay = {
  hidden: { transition: { staggerChildren: 0.02 } },
  show: { transition: { staggerChildren: 0.02 } },
};

const backdrop = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

const panel = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.05, delayChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22 } },
};

function ScrollLock() {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  return null;
}

function Dialog({ project, onClose }: { project: ProjectDialog; onClose: () => void }) {
  const { copy } = useI18n();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center sm:p-6"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={overlay}
    >
      <ScrollLock />
      <motion.div
        className="absolute inset-0 bg-[#05050e]/75"
        variants={backdrop}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        variants={panel}
        onClick={(event) => event.stopPropagation()}
        className="glass relative z-10 flex max-h-[min(88vh,860px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-[0_0_0_1px_rgba(255,77,141,0.22),0_24px_80px_rgba(0,0,0,0.45)]"
      >
        <div className="overflow-y-auto px-6 py-6">
          <motion.div variants={item} className="flex items-start justify-between gap-4">
            <div>
              {project.year && (
                <p className="text-sm font-semibold tracking-[0.18em] text-blush">{project.year}</p>
              )}
              <h2 id={titleId} className="mt-1 text-2xl font-bold text-[var(--text)] sm:text-3xl">
                {project.title}
              </h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={copy.projects.close}
              className="accent-cyan grid h-10 w-10 shrink-0 place-items-center rounded-full border border-current hover:bg-cyan-300/10"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </motion.div>

          <motion.p variants={item} className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
            {project.description}
          </motion.p>

          {project.details.length > 0 && (
            <motion.ul variants={item} className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[var(--muted)]">
              {project.details.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </motion.ul>
          )}

          <motion.div variants={item} className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="chip-cyan rounded-full border px-2.5 py-0.5 text-xs">
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-6">
            {project.images.length === 0 ? (
              <p className="rounded-xl border border-dashed border-[var(--line)] px-4 py-10 text-center text-sm text-[var(--muted)]">
                {copy.projects.noShots}
              </p>
            ) : (
              <div className={project.images.length > 1 ? 'grid gap-3 sm:grid-cols-2' : 'grid gap-3'}>
                {project.images.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${project.title} ${index + 1}`}
                    className="h-52 w-full rounded-xl border border-[var(--line)] object-cover object-top"
                  />
                ))}
              </div>
            )}
          </motion.div>

          {project.demo && (
            <motion.div variants={item} className="mt-6">
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-blush px-5 py-2 text-sm font-semibold text-white hover:bg-blush-deep"
              >
                {copy.projects.live}
              </a>
            </motion.div>
          )}

          {(project.guestHint || (project.demoAccounts && project.demoAccounts.length > 0)) && (
            <motion.div variants={item} className="mt-6 rounded-xl border border-[var(--line)] px-4 py-3">
              {project.guestHint && (
                <p className="text-sm text-[var(--muted)]">{copy.projects.guestHint}</p>
              )}
              {project.demoAccounts && project.demoAccounts.length > 0 && (
                <div className={project.guestHint ? 'mt-3' : undefined}>
                  <p className="text-sm font-semibold text-[var(--text)]">{copy.projects.demoAccounts}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{copy.projects.demoNote}</p>
                  <ul className="mt-3 space-y-2">
                    {project.demoAccounts.map((account) => (
                      <li key={account.email} className="text-sm text-[var(--muted)]">
                        <span className="font-semibold text-[var(--text)]">{account.label}</span>
                        <span className="mt-0.5 block font-mono text-xs text-[var(--text)] sm:text-sm">
                          {account.email} · {account.password}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

type ProjectModalProps = {
  project: ProjectDialog | null;
  onClose: () => void;
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) =>
  createPortal(
    <AnimatePresence>{project && <Dialog key={project.id} project={project} onClose={onClose} />}</AnimatePresence>,
    document.body,
  );

export default ProjectModal;
