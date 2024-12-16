import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    'React',
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Node.js',
    'Git',
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Me
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            I'm a passionate frontend developer with a keen eye for creating beautiful and functional web applications. 
            With a strong foundation in modern web technologies, I strive to build user-friendly interfaces that provide 
            exceptional user experiences.
          </p>

          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900">Skills</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900">Experience</h3>
            <div className="mt-4 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border-l-2 border-indigo-600 pl-4"
              >
                <h4 className="text-lg font-semibold text-gray-900">Frontend Developer</h4>
                <p className="text-gray-600">Company Name • 2020 - Present</p>
                <p className="mt-2 text-gray-500">
                  Developed and maintained responsive web applications using React and TypeScript.
                  Collaborated with design team to implement pixel-perfect UI components.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border-l-2 border-indigo-600 pl-4"
              >
                <h4 className="text-lg font-semibold text-gray-900">Web Developer Intern</h4>
                <p className="text-gray-600">Company Name • 2019 - 2020</p>
                <p className="mt-2 text-gray-500">
                  Assisted in developing web applications and learned modern web development practices.
                  Gained hands-on experience with React and related technologies.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
