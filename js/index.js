/* OLYMPUS CARS - JavaScript Principal */

$(document).ready(function() {
    console.log('Olympus Cars - Sistema inicializado');
    
    initNavbar();
    initScrollEffects();
    initNewsLoader();
    initStatsCounter();
    initScrollToTop();
    initSmoothScrolling();
});

// Efectos de scroll en navbar
function initNavbar() {
    const navbar = $('#navbar');
    const navToggle = $('#navToggle');
    const navMenu = $('.nav-menu');
    
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    });
    
    navToggle.on('click', function() {
        $(this).toggleClass('active');
        navMenu.toggleClass('active');
    });
    
    console.log('✓ Navbar inicializado correctamente');
}

// Animaciones al hacer scroll
function initScrollEffects() {
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function callbackFunc() {
        $('[data-aos]').each(function() {
            if (isElementInViewport(this)) {
                $(this).addClass('aos-animate');
            }
        });
    }
    
    $(window).on('load scroll', callbackFunc);
    console.log('✓ Efectos de scroll inicializados');
}

// Carga de noticias desde JSON
function initNewsLoader() {
    const noticiasContainer = $('#noticiasContainer');
    const newsURL = './assets/data/noticias.json';
    
    fetch(newsURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('✓ Noticias cargadas:', data);
            noticiasContainer.empty();
            
            if (!data.noticias || data.noticias.length === 0) {
                noticiasContainer.html(`
                    <div class="news-empty">
                        <i class="fas fa-newspaper"></i>
                        <p>No hay noticias disponibles en este momento.</p>
                    </div>
                `);
                return;
            }
            
            data.noticias.forEach((noticia, index) => {
                const newsCard = createNewsCard(noticia, index);
                noticiasContainer.append(newsCard);
            });
            
            console.log(`✓ ${data.noticias.length} noticias renderizadas correctamente`);
        })
        .catch(error => {
            console.error('✗ Error al cargar noticias:', error);
            noticiasContainer.html(`
                <div class="news-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Error al cargar las noticias. Por favor, inténtelo más tarde.</p>
                    <small>${error.message}</small>
                </div>
            `);
        });
}

function createNewsCard(noticia, index) {
    const fecha = formatDate(noticia.fecha);
    
    const categoriaNombre = {
        'lanzamiento': 'Lanzamiento',
        'evento': 'Evento',
        'noticia': 'Noticia'
    };
    
    const card = $(`
        <article class="news-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="news-content">
                <span class="news-category">${categoriaNombre[noticia.categoria] || 'Noticia'}</span>
                <div class="news-date">
                    <i class="fas fa-calendar-alt"></i>
                    <span>${fecha}</span>
                </div>
                <h3 class="news-title">${noticia.titulo}</h3>
                <p class="news-description">${noticia.descripcion}</p>
                <button class="news-link" data-noticia-id="${noticia.id}">
                    Leer más <i class="fas fa-arrow-right"></i>
                </button>
            </div>
            <div class="news-details" style="display: none;">
                <div class="news-extra-info">
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <span><strong>Hora:</strong> 10:00 - 20:00</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span><strong>Ubicación:</strong> Olympus Cars Showroom, Calle de la Luna 12, Madrid</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-phone"></i>
                        <span><strong>Contacto:</strong> +34 955 786 544</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-info-circle"></i>
                        <span><strong>Información adicional:</strong> Visita nuestro showroom para conocer más detalles sobre esta noticia. Nuestro equipo de expertos estará encantado de atenderte.</span>
                    </div>
                </div>
                <button class="news-close">
                    <i class="fas fa-times"></i> Cerrar
                </button>
            </div>
        </article>
    `);
    
    // Event handler para mostrar detalles
    card.find('.news-link').on('click', function() {
        const $details = card.find('.news-details');
        const $button = $(this);
        
        if ($details.is(':visible')) {
            $details.slideUp(300);
            $button.html('Leer más <i class="fas fa-arrow-right"></i>');
        } else {
            $details.slideDown(300);
            $button.html('Ocultar <i class="fas fa-arrow-up"></i>');
        }
    });
    
    // Event handler para cerrar detalles
    card.find('.news-close').on('click', function() {
        card.find('.news-details').slideUp(300);
        card.find('.news-link').html('Leer más <i class="fas fa-arrow-right"></i>');
    });
    
    return card;
}

function formatDate(dateString) {
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    const fecha = new Date(dateString + 'T00:00:00');
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();
    
    return `${dia} de ${mes} de ${anio}`;
}

// Contador de estadísticas
function initStatsCounter() {
    let hasAnimated = false;
    
    function checkAndAnimate() {
        const statsSection = $('.stats-section');
        
        if (statsSection.length && !hasAnimated) {
            const sectionTop = statsSection.offset().top;
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            
            // Activar cuando la sección esté visible (más del 30% en pantalla)
            if (scrollTop + windowHeight > sectionTop + 100) {
                hasAnimated = true;
                animateCounters();
            }
        }
    }
    
    $(window).on('scroll', checkAndAnimate);
    // Verificar también al cargar la página
    checkAndAnimate();
    
    console.log('✓ Contador de estadísticas inicializado');
}

function animateCounters() {
    $('.stat-number').each(function() {
        const $this = $(this);
        const targetValue = parseInt($this.attr('data-count'));
        const duration = 2000;
        const increment = targetValue / (duration / 16);
        let currentValue = 0;
        
        const updateCounter = function() {
            currentValue += increment;
            
            if (currentValue < targetValue) {
                $this.text(Math.ceil(currentValue));
                requestAnimationFrame(updateCounter);
            } else {
                $this.text(targetValue);
            }
        };
        
        requestAnimationFrame(updateCounter);
    });
    
    console.log('✓ Contadores animados');
}

// Botón scroll to top
function initScrollToTop() {
    const scrollTopBtn = $('#scrollTop');
    
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            scrollTopBtn.addClass('visible');
        } else {
            scrollTopBtn.removeClass('visible');
        }
    });
    
    scrollTopBtn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'swing');
    });
    
    console.log('✓ Botón "Volver arriba" inicializado');
}

// Smooth scrolling
function initSmoothScrolling() {
    $('a[href^="#"]').not('.nav-link').on('click', function(e) {
        const targetId = $(this).attr('href');
        
        if (targetId !== '#' && $(targetId).length) {
            e.preventDefault();
            
            const navbarHeight = $('#navbar').outerHeight();
            const targetPosition = $(targetId).offset().top - navbarHeight - 20;
            
            $('html, body').animate({
                scrollTop: targetPosition
            }, 800, 'swing');
        }
    });
    
    console.log('✓ Scroll suave inicializado');
}

// Preloader
$(window).on('load', function() {
    $('.preloader').fadeOut('slow');
    console.log('✓ Página completamente cargada');
});

// Utilidad: Debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Configuración de animaciones
const AOSConfig = {
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
};

// Error handler
window.addEventListener('error', function(event) {
    console.error('Error global capturado:', event.error);
});

console.log(`
╔═══════════════════════════════════════════╗
║      OLYMPUS CARS - SISTEMA ACTIVO       ║
║     Premium Automotive Excellence        ║
╚═══════════════════════════════════════════╝
`);

console.log('Módulos cargados:');
console.log('• Navbar con efectos de scroll');
console.log('• Carga dinámica de noticias');
console.log('• Contadores animados');
console.log('• Scroll suave');
console.log('• Botón volver arriba');
console.log('Sistema listo para usar ✓');