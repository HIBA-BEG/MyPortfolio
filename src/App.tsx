import Dock from './components/Dock'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'

function App() {
  return (
    // section order is the same as the nav order.
    // no background on this div, or it covers the light-mode gradient on body
    <div className="relative min-h-screen text-[var(--text)]">
      {/* the dock walks the page top to bottom */}
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
