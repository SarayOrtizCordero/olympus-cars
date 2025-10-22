/* OLYMPUS CARS - Galería de Vehículos */

$(document).ready(function() {
    // Variables globales
    let todosLosVehiculos = [];
    let vehiculosFiltrados = [];
    let vehiculoActual = 0;

    // Inicialización
    initGallery();
    initLightbox();
    initScrollEffects();
    initScrollTop();

    function initGallery() {
        loadVehicles();
        initFilters();
    }

    function loadVehicles() {
        fetch('../assets/data/vehiculos.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar vehículos');
                }
                return response.json();
            })
            .then(data => {
                todosLosVehiculos = data.vehiculos || [];
                vehiculosFiltrados = [...todosLosVehiculos];
                renderGallery();
            })
            .catch(error => {
                console.error('Error:', error);
                showError();
            });
    }

    function renderGallery() {
        const $galleryGrid = $('#galleryGrid');
        const $resultsCount = $('#resultsCount');
        const $noResults = $('#noResults');

        $resultsCount.text(`${vehiculosFiltrados.length} vehículos encontrados`);
        $galleryGrid.empty();

        if (vehiculosFiltrados.length === 0) {
            $noResults.show();
            return;
        } else {
            $noResults.hide();
        }

        vehiculosFiltrados.forEach((vehiculo, index) => {
            const $card = createVehicleCard(vehiculo, index);
            $galleryGrid.append($card);
        });

        animateCards();
    }

    function createVehicleCard(vehiculo, index) {
        const badges = [];
        if (vehiculo.destacado) badges.push('Destacado');
        if (vehiculo.nuevo) badges.push('Nuevo');

        const badgeHTML = badges.length > 0
            ? `<div class="vehicle-badge">${badges[0]}</div>`
            : '';

        return $(`
            <article class="vehicle-card" data-index="${index}" style="animation-delay: ${index * 0.1}s">
                <div class="vehicle-image">
                    <img src="${vehiculo.imagen}" alt="${vehiculo.nombre}" loading="lazy">
                    ${badgeHTML}
                    <div class="vehicle-overlay">
                        <a href="#" class="btn-view-vehicle" data-index="${index}">
                            <i class="fas fa-search-plus"></i>
                            <span>Ver Detalles</span>
                        </a>
                    </div>
                </div>
                <div class="vehicle-info">
                    <h3 class="vehicle-name">${vehiculo.nombre}</h3>
                    <p class="vehicle-brand">
                        <i class="fas fa-tag"></i>
                        ${vehiculo.marca} - ${vehiculo.tipo}
                    </p>
                    <div class="vehicle-details">
                        <div class="vehicle-detail">
                            <span class="vehicle-detail-label">Potencia</span>
                            <span class="vehicle-detail-value">${vehiculo.potencia} CV</span>
                        </div>
                        <div class="vehicle-detail">
                            <span class="vehicle-detail-label">Transmisión</span>
                            <span class="vehicle-detail-value">${vehiculo.transmision}</span>
                        </div>
                    </div>
                    <div class="vehicle-price">
                        <div class="price-label">Precio desde</div>
                        <div class="price-value">${formatPrice(vehiculo.precio)}</div>
                    </div>
                </div>
            </article>
        `);
    }

    function animateCards() {
        $('.vehicle-card').each(function(index) {
            const $card = $(this);
            setTimeout(() => {
                $card.addClass('fade-in');
            }, index * 50);
        });
    }

    function initFilters() {
        const $searchInput = $('#searchInput');
        const $marcaFilter = $('#marcaFilter');
        const $tipoFilter = $('#tipoFilter');
        const $resetBtn = $('#resetFilters');

        let searchTimeout;
        $searchInput.on('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                filterVehicles();
            }, 300);
        });

        $marcaFilter.on('change', filterVehicles);
        $tipoFilter.on('change', filterVehicles);
        $resetBtn.on('click', resetFilters);
    }

    function filterVehicles() {
        const searchTerm = $('#searchInput').val().toLowerCase().trim();
        const marcaSeleccionada = $('#marcaFilter').val().trim();
        const tipoSeleccionado = $('#tipoFilter').val().trim();

        vehiculosFiltrados = todosLosVehiculos.filter(vehiculo => {
            // Búsqueda por texto (nombre, marca o descripción)
            let matchSearch = true;
            if (searchTerm !== '') {
                matchSearch = vehiculo.nombre.toLowerCase().includes(searchTerm) ||
                             vehiculo.marca.toLowerCase().includes(searchTerm) ||
                             (vehiculo.descripcion && vehiculo.descripcion.toLowerCase().includes(searchTerm));
            }

            // Filtro por marca (comparación exacta)
            let matchMarca = true;
            if (marcaSeleccionada !== '' && marcaSeleccionada !== 'todas') {
                matchMarca = vehiculo.marca === marcaSeleccionada;
            }

            // Filtro por tipo (comparación exacta)
            let matchTipo = true;
            if (tipoSeleccionado !== '' && tipoSeleccionado !== 'todos') {
                matchTipo = vehiculo.tipo === tipoSeleccionado;
            }

            return matchSearch && matchMarca && matchTipo;
        });

        renderGallery();
    }

    function resetFilters() {
        $('#searchInput').val('');
        $('#marcaFilter').val('');
        $('#tipoFilter').val('');
        vehiculosFiltrados = [...todosLosVehiculos];
        renderGallery();
    }

    function initLightbox() {
        $(document).on('click', '.btn-view-vehicle', function(e) {
            e.preventDefault();
            const index = $(this).data('index');
            openLightbox(index);
        });

        $('.lightbox-close').on('click', closeLightbox);
        
        $('.lightbox-modal').on('click', function(e) {
            if ($(e.target).is('.lightbox-modal')) {
                closeLightbox();
            }
        });

        $('.lightbox-prev').on('click', () => navigateLightbox(-1));
        $('.lightbox-next').on('click', () => navigateLightbox(1));

        $(document).on('keydown', handleKeyboard);
    }

    function openLightbox(index) {
        vehiculoActual = index;
        updateLightboxContent();
        $('.lightbox-modal').addClass('active');
        $('body').css('overflow', 'hidden');
    }

    function closeLightbox() {
        $('.lightbox-modal').removeClass('active');
        $('body').css('overflow', '');
    }

    function navigateLightbox(direction) {
        vehiculoActual += direction;
        
        if (vehiculoActual < 0) {
            vehiculoActual = vehiculosFiltrados.length - 1;
        } else if (vehiculoActual >= vehiculosFiltrados.length) {
            vehiculoActual = 0;
        }
        
        updateLightboxContent();
    }

    function updateLightboxContent() {
        const vehiculo = vehiculosFiltrados[vehiculoActual];
        
        $('#lightboxImage').attr({
            'src': vehiculo.imagen,
            'alt': vehiculo.nombre
        });
        
        $('#lightboxTitle').text(vehiculo.nombre);
        
        $('.lightbox-details').html(`
            <span><i class="fas fa-tag"></i> ${vehiculo.marca}</span>
            <span><i class="fas fa-car"></i> ${vehiculo.tipo}</span>
            <span><i class="fas fa-tachometer-alt"></i> ${vehiculo.potencia} CV</span>
            <span><i class="fas fa-cog"></i> ${vehiculo.transmision}</span>
            ${vehiculo.descripcion ? `<p class="vehiculo-descripcion"><i class="fas fa-info-circle"></i> ${vehiculo.descripcion}</p>` : ''}
        `);
        
        $('.lightbox-price').text(formatPrice(vehiculo.precio));

        if (vehiculosFiltrados.length <= 1) {
            $('.lightbox-nav').hide();
        } else {
            $('.lightbox-nav').show();
        }
    }

    function handleKeyboard(e) {
        if (!$('.lightbox-modal').hasClass('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    }

    function formatPrice(precio) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(precio);
    }

    function showError() {
        $('#galleryGrid').html(`
            <div class="gallery-error" style="grid-column: 1 / -1; text-align: center; padding: 4rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #D4AF37; margin-bottom: 1rem;"></i>
                <h3 style="font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 1rem;">Error al cargar vehículos</h3>
                <p style="color: #B0B0B0;">No se pudieron cargar los vehículos. Por favor, intente nuevamente más tarde.</p>
            </div>
        `);
    }

    function initScrollEffects() {
        const $navbar = $('.navbar');
        
        $(window).on('scroll', throttle(function() {
            if ($(window).scrollTop() > 100) {
                $navbar.addClass('scrolled');
            } else {
                $navbar.removeClass('scrolled');
            }
        }, 100));
    }

    function initScrollTop() {
        const $scrollTopBtn = $('.scroll-top');

        $(window).on('scroll', throttle(function() {
            if ($(window).scrollTop() > 300) {
                $scrollTopBtn.addClass('visible');
            } else {
                $scrollTopBtn.removeClass('visible');
            }
        }, 100));

        $scrollTopBtn.on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
        });
    }

    function throttle(func, wait) {
        let timeout;
        let lastTime = 0;

        return function executedFunction() {
            const context = this;
            const args = arguments;
            const now = Date.now();

            const remaining = wait - (now - lastTime);

            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                lastTime = now;
                func.apply(context, args);
            } else if (!timeout) {
                timeout = setTimeout(() => {
                    lastTime = Date.now();
                    timeout = null;
                    func.apply(context, args);
                }, remaining);
            }
        };
    }

    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });
});