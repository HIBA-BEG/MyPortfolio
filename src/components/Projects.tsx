import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n, type Copy, type ProjectId } from '../i18n';
import ProjectModal, { type ProjectDialog } from './ProjectModal';

type ExtraLabel = 'client' | 'server' | 'api';

type DemoLogin = {
  label: string;
  email: string;
  password: string;
};

type Project = {
  id: ProjectId;
  title: string;
  year?: string;
  technologies: string[];
  github?: string;
  extra?: { label: ExtraLabel; href: string };
  demo?: string;
  images?: string[];
  demoAccounts?: DemoLogin[];
  guestHint?: boolean;
};

// repo names match github
// WatchM3aya-Sever (missing r), CinManager-Client (missing e), CineManager-Mobile- (trailing dash)
const projects: Project[] = [
  {
    id: 'maisonNoire',
    title: 'Maison Noire',
    year: '2026',
    technologies: ['Vite', 'React', 'TypeScript', 'Tailwind CSS', 'framer-motion'],
    demo: 'https://maison-noire-restaurant.vercel.app',
    images: ['/projects/maison-noire/01.png', '/projects/maison-noire/02.png'],
  },
  {
    id: 'darZitoun',
    title: 'Dar Zitoun',
    year: '2026',
    technologies: ['Vite', 'React', 'TypeScript', 'Tailwind CSS', 'React Router'],
    demo: 'https://dar-zitoun-six.vercel.app',
    images: ['/projects/dar-zitoun/01.png', '/projects/dar-zitoun/02.png'],
  },
  {
    id: 'syllabug',
    title: 'Syllabug',
    year: '2026',
    technologies: ['Next.js', 'PostgreSQL', 'Vercel'],
    demo: 'https://syllabug-blue.vercel.app',
    images: ['/projects/syllabug/01.png', '/projects/syllabug/02.png'],
    guestHint: true,
    demoAccounts: [
      { label: 'Sara', email: 'sara@syllabug.dev', password: 'Sara!2026demo' },
      { label: 'Youssef', email: 'youssef@syllabug.dev', password: 'Youssef!2026demo' },
    ],
  },
  {
    id: 'webgency',
    title: 'Webgency',
    year: '2026',
    technologies: ['WordPress', 'Elementor', 'Vercel'],
    demo: 'https://webgency-dusky.vercel.app',
    images: ['/projects/webgency/01.png', '/projects/webgency/02.png'],
  },
  {
    id: 'ghoriani',
    title: 'Ghoriani portfolio',
    year: '2026',
    technologies: ['Next.js', 'GSAP', 'Lenis'],
  },
  {
    id: 'observer',
    title: 'Observer',
    year: '2025',
    technologies: ['NestJS', 'React Native', 'MongoDB', 'Jest', 'Docker'],
    github: 'https://github.com/HIBA-BEG/Outsider_fil_rouge',
  },
  {
    id: 'wellness',
    title: 'Wellness Warriors',
    year: '2024',
    technologies: ['NestJS', 'React', 'MongoDB', 'Jest', 'Docker'],
    github: 'https://github.com/HIBA-BEG/Wellness-Warriors-Service',
    extra: { label: 'client', href: 'https://github.com/HIBA-BEG/Wellness-Warriors-Client' },
    demo: 'https://wellness-warriors-client.vercel.app',
    images: ['/projects/wellness/01.png', '/projects/wellness/02.png', '/projects/wellness/03.png'],
    demoAccounts: [
      { label: 'organizer', email: 'organizer@wellnesswarriors.demo', password: 'OrganizerDemo123!' },
      { label: 'participant', email: 'amina.bennani@wellnesswarriors.demo', password: 'ParticipantDemo123!' },
    ],
  },
  {
    id: 'quickconnect',
    title: 'QuickConnect',
    year: '2024',
    technologies: ['React', 'TypeScript', 'NestJS', 'Socket.io', 'WebRTC'],
    github: 'https://github.com/HIBA-BEG/QuickConnect',
  },
  {
    id: 'watch',
    title: 'Watch M3aya',
    technologies: ['TypeScript'],
    github: 'https://github.com/HIBA-BEG/WatchM3aya-Client',
    extra: { label: 'server', href: 'https://github.com/HIBA-BEG/WatchM3aya-Sever' },
  },
  {
    id: 'cine',
    title: 'CineManager',
    technologies: ['JavaScript'],
    github: 'https://github.com/HIBA-BEG/CinManager-Client',
    extra: { label: 'server', href: 'https://github.com/HIBA-BEG/CineManager-Server' },
  },
  {
    id: 'cineMobile',
    title: 'CineManager Mobile',
    technologies: ['React Native', 'JavaScript'],
    github: 'https://github.com/HIBA-BEG/CineManager-Mobile-',
  },
  {
    id: 'body',
    title: 'BodyTracker',
    technologies: ['TypeScript'],
    github: 'https://github.com/HIBA-BEG/BodyTracker',
  },
  {
    id: 'quiz',
    title: 'JSQuizMaster',
    technologies: ['JavaScript', 'EJS', 'Node.js'],
    github: 'https://github.com/HIBA-BEG/JSSmartExam',
  },
  {
    id: 'reclam',
    title: 'ReclamAction',
    year: '2024',
    technologies: ['Laravel', 'MySQL', 'Tailwind CSS'],
    github: 'https://github.com/HIBA-BEG/Gestion-des-Tickets-de-Reclamations',
  },
  {
    id: 'evento',
    title: 'Evento',
    technologies: ['Laravel', 'PHP'],
    github: 'https://github.com/HIBA-BEG/EVENTO',
  },
  {
    id: 'dar',
    title: 'Dar Chabab',
    technologies: ['Laravel', 'Blade', 'PHP'],
    github: 'https://github.com/HIBA-BEG/DarChabab_FilRouge_A1',
  },
  {
    id: 'maroc',
    title: 'MarocExplore',
    technologies: ['React', 'PHP', 'REST'],
    github: 'https://github.com/HIBA-BEG/MarocExplore-ReactJS',
    extra: { label: 'api', href: 'https://github.com/HIBA-BEG/MarocExplore-RestAPI' },
  },
];

function detailLines(id: ProjectId, copy: Copy): readonly string[] {
  const details = copy.projects.details;
  if (id === 'maisonNoire' || id === 'darZitoun' || id === 'syllabug' || id === 'webgency' || id === 'ghoriani') return details[id];
  return [];
}

const Projects = () => {
  const { copy } = useI18n();
  const [openId, setOpenId] = useState<ProjectId | null>(null);
  const close = useCallback(() => setOpenId(null), []);

  const active = projects.find((item) => item.id === openId) ?? null;
  const dialog: ProjectDialog | null = active
    ? {
        id: active.id,
        title: active.title,
        year: active.year,
        technologies: active.technologies,
        demo: active.demo,
        images: active.images ?? [],
        description: copy.projects.descriptions[active.id],
        details: detailLines(active.id, copy),
        guestHint: active.guestHint,
        demoAccounts: active.demoAccounts?.map((account) => ({
          ...account,
          label:
            account.label === 'organizer'
              ? copy.projects.roles.organizer
              : account.label === 'participant'
                ? copy.projects.roles.participant
                : account.label,
        })),
      }
    : null;

  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-extrabold sm:text-5xl">
          <span className="text-[var(--text)]">{copy.projects.lead}</span>
          <span className="text-blush">{copy.projects.accent}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--muted)]">{copy.projects.intro}</p>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index, 6) * 0.06 }}
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={copy.projects.open.replace('{title}', project.title)}
              onClick={() => setOpenId(project.id)}
              onKeyDown={(event) => {
                if (event.target !== event.currentTarget) return;
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setOpenId(project.id);
                }
              }}
              className="glass flex cursor-pointer flex-col rounded-2xl p-6 shadow-[0_0_0_1px_rgba(255,77,141,0.15)] outline-none transition hover:shadow-[0_0_30px_rgba(255,77,141,0.25)] focus-visible:ring-2 focus-visible:ring-blush"
            >
              {project.year && (
                <p className="text-sm font-semibold tracking-[0.18em] text-blush">{project.year}</p>
              )}
              <h3 className="mt-2 text-2xl font-bold text-[var(--text)]">{project.title}</h3>
              <p className="mt-3 flex-1 text-sm text-[var(--muted)]">{copy.projects.descriptions[project.id]}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="chip-cyan rounded-full border px-2.5 py-0.5 text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              {/* GitHub button and Client / Server / API hidden for now.
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-blush px-5 py-2 text-sm font-semibold text-white hover:bg-blush-deep"
                >
                  {copy.projects.github}
                </a>
                {project.extra && (
                  <a
                    href={project.extra.href}
                    target="_blank"
                    rel="noreferrer"
                    className="accent-cyan rounded-full border border-current px-5 py-2 text-sm font-semibold hover:bg-cyan-300/10"
                  >
                    {copy.projects[project.extra.label]}
                  </a>
                )}
              </div>
              */}
              {project.demo && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="rounded-full bg-blush px-5 py-2 text-sm font-semibold text-white hover:bg-blush-deep"
                  >
                    {copy.projects.live}
                  </a>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
      <ProjectModal project={dialog} onClose={close} />
    </section>
  );
};

export default Projects;
