import { createContext, useContext, useEffect, useState } from 'react';

export type Locale = 'en' | 'fr';

// default language is English unless someone switches to FR, then it's saved as localStorage "lang"
const copy = {
  en: {
    metaTitle: 'Hiba Beghdi | QA Analyst and Web Developer in Safi',
    metaDescription:
      'Hiba Beghdi, QA analyst and web developer in Safi, Morocco. Manual and automated testing, React, NestJS, and Laravel.',
    nav: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact',
    },
    a11y: {
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      sections: 'Sections',
      play: 'Play background animation',
      pause: 'Pause background animation',
      light: 'Switch to light mode',
      dark: 'Switch to dark mode',
      toFrench: 'Translate the site into French',
      toEnglish: 'Show the site in English',
    },
    hero: {
      available: 'Available',
      greeting: "Hi, I'm",
      role: '< QA Analyst + Developer >',
      engineer: 'Engineer in the making',
      bio: 'Manual and automated testing, with a full-stack background in React, NestJS, and Laravel. Based in Morocco. Available immediately.',
      years: 'Years',
      repos: 'GitHub repos',
      dev: '+ Dev',
      download: 'Download CV',
      hire: 'Hire Me',
    },
    about: {
      eyebrow: 'About me',
      title: 'About Me',
      body: 'QA analyst with a full-stack development background. About a year and a half of experience in manual and automated testing with Robot Framework, requirements analysis, test-case design, and defect tracking in Agile Scrum teams. In the second year of an evening engineering cycle at SupMTI, Rabat.',
      groups: [
        {
          title: 'Testing',
          items: ['Functional', 'Regression', 'Integration', 'E2E', 'API testing', 'Robot Framework', 'Selenium', 'Postman', 'Jest'],
        },
        { title: 'Methods', items: ['Jira', 'Trello', 'Agile Scrum', 'Kanban', 'UML'] },
        {
          title: 'Development',
          items: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'NestJS', 'PHP', 'Laravel'],
        },
        { title: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
        { title: 'DevOps', items: ['Git', 'GitHub Actions', 'Docker', 'Jenkins', 'Figma'] },
      ],
      languages: 'Languages: Arabic (native), English (fluent), French (professional)',
    },
    experience: {
      title: 'Experience',
      roles: [
        {
          title: 'QA Analyst',
          org: 'Cegedim (Smart RX), Rabat',
          period: 'Jan 2025 – Jul 2026',
          note: 'Six-month internship, then a permanent role from August 2025',
          points: [
            'Analyzed functional and non-functional requirements and defined acceptance criteria',
            'Designed and wrote test cases from those requirements',
            'Ran manual and automated tests with Robot Framework',
            'Logged, analyzed, and tracked defects in Jira',
            'Worked in an Agile Scrum team',
          ],
        },
        {
          title: 'Full-Stack Developer (Intern)',
          org: 'Ministère de l’Équipement et de l’Eau, Rabat',
          period: 'May 2024 – Jul 2024',
          note: 'ReclamAction, a claim-ticket management application',
          points: [
            'Built ticket submission, tracking, assignment by support level, and comments',
            'Added a statistics dashboard and email notifications',
            'Stack: Laravel, Eloquent, Blade, Tailwind CSS, MySQL, JavaScript',
          ],
        },
        {
          title: 'Developer (Intern)',
          org: 'Direction provinciale de la Jeunesse, Safi',
          period: 'Apr 2021 – Jun 2021',
          note: 'Training-center management application',
          points: ['Built the application in PHP, HTML, and CSS, with UML for the design'],
        },
      ],
    },
    projects: {
      lead: 'My ',
      accent: 'Projects',
      intro: 'Open a card to read the details. A live demo is shown when the project is deployed.',
      github: 'GitHub',
      client: 'Client',
      server: 'Server',
      api: 'API',
      live: 'Live demo',
      close: 'Close',
      noShots: 'No screenshots for this project yet.',
      open: 'Open details for {title}',
      demoAccounts: 'Demo accounts',
      demoNote: 'Public demo logins, so you can try the app without registering.',
      guestHint: 'Or choose Try without an account. Guest data stays in this browser.',
      roles: { organizer: 'Organizer', participant: 'Participant' },
      descriptions: {
        maisonNoire:
          'Fine-dining restaurant demo: dark gold UI, six-course tasting menu, wine list, chef page, and a reservation flow with live estimate. Front-end only, fictional restaurant, live on Vercel.',
        darZitoun:
          'Moroccan restaurant demo set in a Rabat riad: warm terracotta and gold, menu in MAD, gallery, story, reservation and contact. Front-end only, fictional restaurant, live on Vercel.',
        syllabug:
          'ISTQB CTFL v4.0 study app: chapters, daily quiz, mistake review, mock exams, guest mode and accounts, FR/EN, themes. Live on Vercel.',
        webgency:
          'Agency marketing site for entrepreneurs and SMEs: services, social proof, FAQ. Live on Vercel.',
        ghoriani:
          'Client portfolio for a photographer and filmmaker, in French and English. The live demo is not published yet.',
        observer:
          'Mobile event app with Admin, Organizer, and Participant roles. About 100 Jest unit tests, GitHub Actions CI with a Docker build, and an API documented in Postman.',
        wellness:
          'Platform for signing up to sports events, with Jest unit tests, CI, and Docker. The service and the client live in separate repositories.',
        quickconnect:
          'Real-time messaging with private channels, groups, and audio and video calls. Built in a team of four.',
        watch: 'Shared video-on-demand rooms. People watch synchronized playlists together and collaborate in real time.',
        cine: 'Cinema platform for films, rooms, sessions, and bookings, with video on demand for clients and an admin area.',
        cineMobile: 'React Native app for MyVOD: sign up, sign in, stream films, and manage a personal profile.',
        body: 'Mobile app for tracking physical progress from a personal profile, including a weekly body-fat estimate.',
        quiz: 'Web app for schools, training centers, and companies to create tests and follow results.',
        reclam:
          'Claim-ticket app from the ministry internship: submission, assignment by support level, comments, a statistics dashboard, and email notifications.',
        evento: 'Event management and seat reservation.',
        dar: 'Youth-center management app, built as a first-year capstone.',
        maroc: 'Morocco travel app with a React interface and a separate REST API.',
      },
      details: {
        maisonNoire: [
          'Six-course tasting menu with optional wine pairing.',
          'Wine list in tabs, chef page, reservation with validation.',
          'Vite, React, TypeScript, Tailwind, framer-motion. Deployed on Vercel.',
        ],
        darZitoun: [
          'Menu with tabs, gallery lightbox, story, reservation and contact.',
          'Warm palette, zellige-inspired layout, prices in MAD.',
          'Vite, React, TypeScript, Tailwind, React Router. Deployed on Vercel.',
        ],
        syllabug: [
          'Chapters follow the ISTQB CTFL v4.0 syllabus.',
          'Daily quiz, mistake review, and mock exams.',
          'Guest mode or an account, in French and English, with themes.',
        ],
        webgency: [
          'Services presented for entrepreneurs and SMEs.',
          'Social proof and an FAQ on the same site.',
          'Built with WordPress and Elementor, deployed on Vercel.',
        ],
        ghoriani: [
          'Client site for a photographer and filmmaker.',
          'The pages are available in French and English.',
          'Motion uses GSAP, and scrolling uses Lenis.',
        ],
      },
    },
    education: {
      lead: 'Educ',
      rest: 'ation',
      studies: [
        {
          period: '2nd year, in progress',
          title: 'Engineering cycle, Information Systems',
          org: 'SupMTI, Rabat · evening classes',
        },
        { period: '2026', title: 'Bachelor’s in Information Systems', org: 'SupMTI, Rabat' },
        { period: '2023 – 2025', title: 'Full-Stack Web Development', org: 'YouCode Safi (Simplon / OCP)' },
        {
          period: '2018 – 2021',
          title: 'DUT in Computer Engineering',
          org: 'École Supérieure de Technologie de Safi',
        },
      ],
    },
    contact: {
      lead: 'Get in ',
      accent: 'Touch',
      intro: 'A question, a role, or a project. Write here, or use the links beside the form.',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      locationValue: 'Rabat, Morocco',
      name: 'Your Name',
      namePlaceholder: "What's your name?",
      emailLabel: 'Your Email',
      emailPlaceholder: "What's your email?",
      message: 'Your Message',
      messagePlaceholder: 'What do you want to say?',
      sending: 'Sending...',
      send: 'Send Message',
      success: 'Message sent successfully!',
      error: 'Failed to send message. Please try again.',
    },
  },
  fr: {
    metaTitle: 'Hiba Beghdi | Analyste QA et développeuse web à Safi',
    metaDescription:
      'Hiba Beghdi, analyste QA et développeuse web à Safi, au Maroc. Tests manuels et automatisés, React, NestJS et Laravel.',
    nav: {
      home: 'Accueil',
      about: 'À propos',
      experience: 'Expérience',
      projects: 'Projets',
      education: 'Formation',
      contact: 'Contact',
    },
    a11y: {
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      sections: 'Rubriques',
      play: "Lancer l'animation du fond",
      pause: "Mettre en pause l'animation du fond",
      light: 'Passer en mode clair',
      dark: 'Passer en mode sombre',
      toFrench: 'Traduire le site en français',
      toEnglish: 'Afficher le site en anglais',
    },
    hero: {
      available: 'Disponible',
      greeting: 'Je suis',
      role: '< Analyste QA + Développeuse >',
      engineer: 'Future ingénieure',
      bio: 'Tests manuels et automatisés, avec une base full-stack en React, NestJS et Laravel. Basée au Maroc. Disponible immédiatement.',
      years: 'Années',
      repos: 'Dépôts GitHub',
      dev: '+ Dév',
      download: 'Télécharger le CV',
      hire: 'Me recruter',
    },
    about: {
      eyebrow: 'À propos',
      title: 'À propos de moi',
      body: "Analyste QA avec une formation full-stack. Environ un an et demi d'expérience en tests manuels et automatisés avec Robot Framework, analyse des besoins, conception de cas de test et suivi des anomalies dans des équipes Agile Scrum. En deuxième année du cycle d'ingénierie en cours du soir à SupMTI, Rabat.",
      groups: [
        {
          title: 'Tests',
          items: ['Fonctionnel', 'Régression', 'Intégration', 'E2E', 'Tests API', 'Robot Framework', 'Selenium', 'Postman', 'Jest'],
        },
        { title: 'Méthodes', items: ['Jira', 'Trello', 'Agile Scrum', 'Kanban', 'UML'] },
        {
          title: 'Développement',
          items: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'NestJS', 'PHP', 'Laravel'],
        },
        { title: 'Bases de données', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
        { title: 'DevOps', items: ['Git', 'GitHub Actions', 'Docker', 'Jenkins', 'Figma'] },
      ],
      languages: 'Langues : arabe (maternelle), anglais (courant), français (professionnel)',
    },
    experience: {
      title: 'Expérience',
      roles: [
        {
          title: 'Analyste QA',
          org: 'Cegedim (Smart RX), Rabat',
          period: 'janv. 2025 – juil. 2026',
          note: 'Stage de six mois, puis CDI à partir d’août 2025',
          points: [
            "Analyse des exigences fonctionnelles et non fonctionnelles et définition des critères d'acceptation",
            'Conception et rédaction des cas de test à partir de ces exigences',
            'Exécution de tests manuels et automatisés avec Robot Framework',
            'Enregistrement, analyse et suivi des anomalies dans Jira',
            'Travail en équipe Agile Scrum',
          ],
        },
        {
          title: 'Développeuse full-stack (stage)',
          org: 'Ministère de l’Équipement et de l’Eau, Rabat',
          period: 'mai 2024 – juil. 2024',
          note: 'ReclamAction, application de gestion des tickets de réclamation',
          points: [
            "Mise en place de la soumission, du suivi, de l'affectation par niveau de support et des commentaires",
            "Ajout d'un tableau de bord statistiques et de notifications par e-mail",
            'Stack : Laravel, Eloquent, Blade, Tailwind CSS, MySQL, JavaScript',
          ],
        },
        {
          title: 'Développeuse (stage)',
          org: 'Direction provinciale de la Jeunesse, Safi',
          period: 'avr. 2021 – juin 2021',
          note: "Application de gestion d'un centre de formation",
          points: ["Développement de l'application en PHP, HTML et CSS, avec une conception UML"],
        },
      ],
    },
    projects: {
      lead: 'Mes ',
      accent: 'projets',
      intro: 'Ouvrez une carte pour lire le détail. Une démo en ligne s’affiche quand le projet est déployé.',
      github: 'GitHub',
      client: 'Client',
      server: 'Serveur',
      api: 'API',
      live: 'Démo en ligne',
      close: 'Fermer',
      noShots: 'Pas encore de captures pour ce projet.',
      open: 'Ouvrir le détail de {title}',
      demoAccounts: 'Comptes démo',
      demoNote: 'Comptes démo publics, pour essayer l’application sans inscription.',
      guestHint: 'Ou choisissez Essayer sans compte. Les données invité restent dans ce navigateur.',
      roles: { organizer: 'Organisateur', participant: 'Participant' },
      descriptions: {
        maisonNoire:
          'Démo restaurant gastronomique: UI sombre et or, menu dégustation en six plats, carte des vins, page chef, et réservation avec estimation. Front-end only, restaurant fictif, en ligne sur Vercel.',
        darZitoun:
          'Démo restaurant marocain dans un riad à Rabat: terracotta et or, menu en MAD, galerie, histoire, réservation et contact. Front-end only, restaurant fictif, en ligne sur Vercel.',
        syllabug:
          'Application de révision ISTQB CTFL v4.0 : chapitres, quiz du jour, revue des erreurs, examens blancs, mode invité et comptes, FR/EN, thèmes. En ligne sur Vercel.',
        webgency:
          'Site vitrine d’une agence pour les entrepreneurs et les PME : services, preuves sociales, FAQ. En ligne sur Vercel.',
        ghoriani:
          'Portfolio client d’un photographe et réalisateur, en français et en anglais. La démo en ligne n’est pas encore publiée.',
        observer:
          "Application mobile d'événements avec les rôles Admin, Organisateur et Participant. Environ 100 tests unitaires Jest, une CI GitHub Actions avec build Docker, et une API documentée dans Postman.",
        wellness:
          "Plateforme d'inscription à des événements sportifs, avec tests unitaires Jest, CI et Docker. Le service et le client sont dans des dépôts séparés.",
        quickconnect:
          "Messagerie en temps réel avec canaux privés, groupes, et appels audio et vidéo. Réalisée en équipe de quatre.",
        watch:
          'Salles de vidéo à la demande partagées. Les personnes regardent des playlists synchronisées et collaborent en temps réel.',
        cine: 'Plateforme de cinéma pour les films, les salles, les séances et les réservations, avec de la vidéo à la demande et un espace admin.',
        cineMobile:
          'Application React Native pour MyVOD : inscription, connexion, lecture de films et gestion du profil.',
        body: "Application mobile de suivi de la progression physique depuis un profil, avec une estimation hebdomadaire de la masse grasse.",
        quiz: 'Application web pour les écoles, les centres de formation et les entreprises : création de tests et suivi des résultats.',
        reclam:
          "Application de tickets de réclamation du stage au ministère : soumission, affectation par niveau de support, commentaires, tableau de bord statistiques et notifications par e-mail.",
        evento: "Gestion d'événements et réservation de places.",
        dar: 'Application de gestion d’un centre de jeunesse, projet de fin de première année.',
        maroc: 'Application de voyage au Maroc, avec une interface React et une API REST séparée.',
      },
      details: {
        maisonNoire: [
          'Menu dégustation en six plats avec accord mets-vins optionnel.',
          'Carte des vins en onglets, page chef, réservation avec validation.',
          'Vite, React, TypeScript, Tailwind, framer-motion. Déployé sur Vercel.',
        ],
        darZitoun: [
          'Menu en onglets, galerie lightbox, histoire, réservation et contact.',
          'Palette chaude, ambiance riad, prix en MAD.',
          'Vite, React, TypeScript, Tailwind, React Router. Déployé sur Vercel.',
        ],
        syllabug: [
          'Chapitres alignés sur le syllabus ISTQB CTFL v4.0.',
          'Quiz du jour, revue des erreurs et examens blancs.',
          'Mode invité ou compte, en français et en anglais, avec des thèmes.',
        ],
        webgency: [
          'Services présentés pour les entrepreneurs et les PME.',
          'Preuves sociales et une FAQ sur le même site.',
          'Réalisé avec WordPress et Elementor, déployé sur Vercel.',
        ],
        ghoriani: [
          'Site client pour un photographe et réalisateur.',
          'Les pages sont disponibles en français et en anglais.',
          'Les animations utilisent GSAP, et le défilement utilise Lenis.',
        ],
      },
    },
    education: {
      lead: 'Form',
      rest: 'ation',
      studies: [
        {
          period: '2e année, en cours',
          title: "Cycle d'ingénierie, systèmes d'information",
          org: 'SupMTI, Rabat · cours du soir',
        },
        { period: '2026', title: "Licence en systèmes d'information", org: 'SupMTI, Rabat' },
        { period: '2023 – 2025', title: 'Développement web full-stack', org: 'YouCode Safi (Simplon / OCP)' },
        {
          period: '2018 – 2021',
          title: 'DUT en génie informatique',
          org: 'École Supérieure de Technologie de Safi',
        },
      ],
    },
    contact: {
      lead: 'Me ',
      accent: 'contacter',
      intro: 'Une question, un poste ou un projet. Écrivez ici, ou utilisez les liens à côté du formulaire.',
      email: 'E-mail',
      phone: 'Téléphone',
      location: 'Lieu',
      locationValue: 'Rabat, Maroc',
      name: 'Votre nom',
      namePlaceholder: 'Comment vous appelez-vous ?',
      emailLabel: 'Votre e-mail',
      emailPlaceholder: 'Quelle est votre adresse e-mail ?',
      message: 'Votre message',
      messagePlaceholder: 'Que souhaitez-vous dire ?',
      sending: 'Envoi...',
      send: 'Envoyer',
      success: 'Message envoyé.',
      error: "L'envoi a échoué. Réessayez.",
    },
  },
} as const;

export type Copy = (typeof copy)[Locale];
export type ProjectId = keyof (typeof copy)['en']['projects']['descriptions'];

type LanguageContextValue = {
  locale: Locale;
  copy: Copy;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readLocale(): Locale {
  try {
    return localStorage.getItem('lang') === 'fr' ? 'fr' : 'en';
  } catch {
    return 'en';
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readLocale);

  useEffect(() => {
    const meta = copy[locale];
    document.documentElement.lang = locale;
    document.title = meta.metaTitle;
    const setContent = (selector: string, value: string) => {
      document.querySelector(selector)?.setAttribute('content', value);
    };
    setContent('meta[name="description"]', meta.metaDescription);
    setContent('meta[property="og:title"]', meta.metaTitle);
    setContent('meta[property="og:description"]', meta.metaDescription);
    setContent('meta[property="og:locale"]', locale === 'fr' ? 'fr_FR' : 'en_US');
    setContent('meta[name="twitter:title"]', meta.metaTitle);
    setContent('meta[name="twitter:description"]', meta.metaDescription);
    localStorage.setItem('lang', locale);
  }, [locale]);

  const toggleLocale = () => setLocale((current) => (current === 'en' ? 'fr' : 'en'));

  return (
    <LanguageContext.Provider value={{ locale, copy: copy[locale], toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useI18n must be used within LanguageProvider');
  return value;
}
