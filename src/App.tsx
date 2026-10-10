import Dock from './components/Dock'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'

function App() {
  return (
    // section order is the nav order. the dock walks the page top to bottom
    // no background on this div, or it covers the light-mode gradient on body
    <div className="relative min-h-screen text-[var(--text)]">
      <Dock />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  )
}

export default App
