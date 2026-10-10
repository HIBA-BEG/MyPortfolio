import { motion } from 'framer-motion';
import { useI18n } from '../i18n';

const chipColors = ['border-blush text-blush', 'chip-cyan border', 'chip-lime border'];

const About = () => {
  const { copy } = useI18n();

  return (
    <section id="about" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blush">{copy.about.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-extrabold text-[var(--text)] sm:text-5xl">{copy.about.title}</h2>
          <p className="mt-5 max-w-3xl text-lg text-[var(--muted)]">{copy.about.body}</p>

          <div className="mt-10 space-y-5">
            {copy.about.groups.map((group) => (
              <div key={group.title} className="grid gap-3 sm:grid-cols-[11rem_1fr] sm:items-start">
                <h3 className="pt-1 text-sm font-semibold text-[var(--text)]">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, index) => (
                    <span
                      key={skill}
                      className={`rounded-full border bg-black/20 px-3 py-1 text-sm ${chipColors[index % chipColors.length]}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[var(--muted)]">{copy.about.languages}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
