import { motion } from 'framer-motion';
import { useI18n } from '../i18n';

const Experience = () => {
  const { copy } = useI18n();

  return (
    <section id="experience" className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl font-extrabold text-[var(--text)] sm:text-5xl">{copy.experience.title}</h2>
        <div className="relative mt-10 space-y-6 border-l-2 border-blush pl-6">
          {copy.experience.roles.map((role, index) => (
            <motion.article
              key={role.title}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass relative rounded-2xl p-5"
            >
              <span className="absolute -left-[1.95rem] top-6 h-3 w-3 rounded-full bg-blush shadow-[0_0_12px_#ff4d8d]" />
              <h3 className="text-xl font-semibold text-[var(--text)]">{role.title}</h3>
              <p className="mt-1 text-[var(--text)]">{role.org}</p>
              <p className="accent-cyan text-sm">{role.period}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{role.note}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
