import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import { useI18n } from '../i18n';

const Contact = () => {
  const { copy } = useI18n();
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current || isSubmitting) return;

    // input names are name, email, message. the emailjs template has to use those
    // keys are in .env. vite only reads it at startup, so restart after changing them
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      toast.error(copy.contact.error);
      console.error('EmailJS keys missing. Check .env and restart the dev server.');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await emailjs.sendForm(serviceId, templateId, form.current, publicKey);

      if (result.text !== 'OK') {
        toast.error(copy.contact.error);
        return;
      }

      toast.success(copy.contact.success);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(copy.contact.error);
      console.error('EmailJS Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-6 py-20 pb-32">
      <Toaster position="top-center" />
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-4xl font-extrabold sm:text-5xl"
        >
          <span className="text-[var(--text)]">{copy.contact.lead}</span>
          <span className="text-blush">{copy.contact.accent}</span>
        </motion.h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--muted)]">{copy.contact.intro}</p>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
          <div className="glass flex h-full flex-col rounded-2xl p-7">
            <ul className="flex h-full flex-col justify-between gap-5">
              {[
                { label: copy.contact.email, value: 'beghiba@gmail.com', href: 'mailto:beghiba@gmail.com' },
                { label: copy.contact.phone, value: '+212 6 58 14 43 94', href: 'tel:+212658144394' },
                { label: copy.contact.location, value: copy.contact.locationValue, href: '' },
                { label: 'LinkedIn', value: 'linkedin.com/in/hiba-beghdi', href: 'https://www.linkedin.com/in/hiba-beghdi' },
                { label: 'GitHub', value: 'github.com/HIBA-BEG', href: 'https://github.com/HIBA-BEG' },
              ].map((item) => (
                <li key={item.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blush">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="mt-1 block text-[var(--text)] hover:text-blush"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-[var(--text)]">{item.value}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass flex h-full flex-col rounded-2xl p-7">
            <form ref={form} onSubmit={handleSubmit} className="flex h-full flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-[var(--text)]">{copy.contact.name}</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={copy.contact.namePlaceholder}
                    required
                    className="mt-1 w-full rounded-xl border border-cyan-300/40 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-cyan-300"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-[var(--text)]">{copy.contact.emailLabel}</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={copy.contact.emailPlaceholder}
                    required
                    className="mt-1 w-full rounded-xl border border-cyan-300/40 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-cyan-300"
                  />
                </label>
              </div>
              <label className="flex min-h-[10rem] flex-1 flex-col">
                <span className="text-sm font-medium text-[var(--text)]">{copy.contact.message}</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={copy.contact.messagePlaceholder}
                  required
                  className="mt-1 w-full flex-1 resize-none rounded-xl border border-cyan-300/40 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-cyan-300"
                />
              </label>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-blush px-6 py-3 text-sm font-semibold text-white hover:bg-blush-deep disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? copy.contact.sending : copy.contact.send}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
