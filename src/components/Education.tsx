import { useI18n } from '../i18n';

const Education = () => {
  const { copy } = useI18n();

  return (
    <section id="education" className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        {/* split on purpose so the first half stays pink. Formation is Form + ation */}
        <h2 className="text-center text-4xl font-extrabold sm:text-5xl">
          <span className="text-blush">{copy.education.lead}</span>
          <span className="text-[var(--text)]">{copy.education.rest}</span>
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {copy.education.studies.map((study) => (
            <article key={study.title} className="glass rounded-2xl p-6">
              <p className="accent-cyan text-sm font-semibold">{study.period}</p>
              <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">{study.title}</h3>
              <p className="mt-2 text-[var(--muted)]">{study.org}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
