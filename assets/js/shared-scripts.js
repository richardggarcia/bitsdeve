/* ============================================
   BITSDEVE - JAVASCRIPT COMPARTIDO
   Archivo centralizado para evitar duplicación
   ============================================ */

// ============================================
// 1. SMOOTH SCROLLING PARA NAVEGACIÓN
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// 2. MOBILE MENU TOGGLE
// ============================================
const mobileMenuButton = document.getElementById('mobile-menu-button');
const closeMobileMenuButton = document.getElementById('close-mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
}

if (closeMobileMenuButton) {
    closeMobileMenuButton.addEventListener('click', closeMobileMenu);
}

// Cerrar menu mobile al hacer click en un link
if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (e) {
            closeMobileMenu();
            setTimeout(() => {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        });
    });
}

// ============================================
// 3. SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.glass-card, .card-hover, .premium-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.95)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// ============================================
// 4. PARTICLE GENERATION (OPCIONAL)
// ============================================
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';

    const particles = document.querySelector('.particles');
    if (particles) {
        particles.appendChild(particle);

        // Remover partícula después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 6000);
    }
}

// Generar partículas periódicamente (solo si existe el contenedor)
if (document.querySelector('.particles')) {
    setInterval(createParticle, 2000);
}

// ============================================
// 5. PARALLAX EFFECT PARA HERO
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelector('.particles');
    const heroBackground = document.querySelector('.hero-background');
    const techPattern = document.querySelector('.tech-pattern');

    if (particles) {
        particles.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    if (techPattern) {
        techPattern.style.transform = `translateY(${scrolled * 0.35}px)`;
    }
});

// ============================================
// 6. FORM VALIDATION ENHANCEMENT
// ============================================
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', function () {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#00FFFF';
        }
    });

    input.addEventListener('focus', function () {
        this.style.borderColor = '#00FFFF';
    });
});

// ============================================
// 7. HERO ANIMATIONS (DOMContentLoaded)
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    // Animación de entrada para elementos del hero
    const heroElements = document.querySelectorAll('.hero-text, .hero-visual, .trust-indicators');

    heroElements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';

            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 * (index + 1));
        }
    });

    // Animación de los badges tecnológicos
    const techBadges = document.querySelectorAll('.tech-badge');

    techBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';

        setTimeout(() => {
            badge.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 1000 + (200 * index));
    });

    // Contador animado para las métricas
    const metrics = document.querySelectorAll('.metric .number');

    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);

        const updateCounter = () => {
            start += increment;

            if (start < target) {
                element.textContent = Math.ceil(start) + (element.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            }
        };

        updateCounter();
    };

    // Iniciar contadores cuando sean visibles
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;

                if (text.includes('3')) {
                    animateCounter(element, 3);
                } else if (text.includes('2+')) {
                    animateCounter(element, 2);
                }

                metricsObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    metrics.forEach(metric => {
        metricsObserver.observe(metric);
    });
});

// ============================================
// 8. MODAL FUNCTIONS (SUCCESS MODAL)
// ============================================
function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (!modal) return;

    const modalContent = modal.querySelector('.glass-card');

    modal.classList.remove('hidden');

    // Animar la entrada del modal
    setTimeout(() => {
        if (modalContent) {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }
    }, 10);
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (!modal) return;

    const modalContent = modal.querySelector('.glass-card');

    // Animar la salida del modal
    if (modalContent) {
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
    }

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Cerrar modal al hacer click fuera de él
const successModal = document.getElementById('success-modal');
if (successModal) {
    successModal.addEventListener('click', function (e) {
        if (e.target === this) {
            closeSuccessModal();
        }
    });
}

// ============================================
// 9. CONTACT FORM HANDLER
// ============================================
async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Validación básica
    if (!name || !email || !message) {
        alert('Por favor completa todos los campos');
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Estado de loading
    submitButton.textContent = 'ENVIANDO...';
    submitButton.disabled = true;
    submitButton.classList.add('pulse-cyan');

    try {
        // Enviar email usando API
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        });

        const result = await response.json();

        if (response.ok) {
            // Éxito: mostrar modal y resetear formulario
            showSuccessModal();
            form.reset();

            // Resetear botón después de un delay
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('pulse-cyan');
            }, 2000);

        } else {
            // Error del servidor
            throw new Error(result.error || 'Error al enviar el mensaje');
        }

    } catch (error) {
        console.error('Error:', error);

        // Mostrar error al usuario
        alert('Hubo un error al enviar tu mensaje. Por favor intenta nuevamente o contáctanos directamente por WhatsApp.');

        // Resetear botón
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('pulse-cyan');
    }
}

// ============================================
// 10. CONSOLE MESSAGE
// ============================================
console.log('%c🚀 bitsdeve', 'color: #00FFFF; font-size: 24px; font-weight: bold;');
console.log('%cDesarrollo Web con Inteligencia Artificial', 'color: #3B82F6; font-size: 14px;');
console.log('%cSi estás viendo esto, probablemente seas desarrollador. ¡Contáctanos!', 'color: #F97316; font-size: 12px;');
