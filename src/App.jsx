import './components/Navbar.css'
import './components/Hero.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Steps from './components/Steps'
import AppGallery from './components/AppGallery'
import Testimonials from './components/Testimonials'
import DownloadApp from './components/DownloadApp'
import Footer from './components/Footer'

function App() {
    return (
        <div className="app">
            <Navbar />
            <Hero />
            <Features />
            <Steps />
            <AppGallery />
            <Testimonials />
            <DownloadApp />
            <Footer />
        </div>
    )
}

export default App
