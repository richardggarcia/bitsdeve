import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
    return (
        <div className="flex flex-col min-h-screen relative">
            <ParticlesBackground />
            {/* El contenido principal necesita z-index relativo para estar por encima de las partículas (z-0) */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow">
                    <Hero />
                    <About />
                    <TechStack />
                    <Projects />
                    <Contact />
                </main>

                <Footer />
            </div>
        </div>
    );
}

export default App;
