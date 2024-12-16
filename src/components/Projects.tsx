import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, cardHoverVariants } from '../utils/animations';

const Projects = () => {
  const projects = [
    {
      title: 'Project 1',
      description: 'A web application built with React and TypeScript that helps users manage their tasks efficiently.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      image: '/project1.jpg',
      github: '#',
      demo: '#'
    },
    {
      title: 'Project 2',
      description: 'An e-commerce platform with a modern UI and seamless shopping experience.',
      technologies: ['Next.js', 'Node.js', 'MongoDB'],
      image: '/project2.jpg',
      github: '#',
      demo: '#'
    },
    {
      title: 'Project 3',
      description: 'A real-time chat application with features like message encryption and file sharing.',
      technologies: ['React', 'Firebase', 'Material-UI'],
      image: '/project3.jpg',
      github: '#',
      demo: '#'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Projects
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Here are some of my recent projects that showcase my skills and experience.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                whileHover="hover"
                initial="initial"
                viewport={{ once: true }}
                className="group bg-white rounded-lg shadow-lg overflow-hidden transform-gpu"
              >
                <motion.div 
                  className="relative h-48 bg-gray-300 group-hover:scale-105 transition-transform duration-300"
                  variants={cardHoverVariants}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={project.image}
                    alt={project.title}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </motion.div>
                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-semibold text-gray-900"
                    variants={fadeInUp}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p 
                    className="mt-2 text-gray-500"
                    variants={fadeInUp}
                  >
                    {project.description}
                  </motion.p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        variants={fadeInUp}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div 
                    className="mt-6 flex space-x-3"
                    variants={fadeInUp}
                  >
                    <motion.a
                      href={project.github}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      GitHub
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live Demo
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
