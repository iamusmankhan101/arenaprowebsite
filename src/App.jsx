import './components/Navbar.css'
import './components/Hero.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Steps from './components/Steps'
import BentoGrid from './components/BentoGrid'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Features />
      <Steps />
      <BentoGrid />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default App
