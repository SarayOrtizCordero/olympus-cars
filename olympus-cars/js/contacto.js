/* OLYMPUS CARS - Contacto (Mapa interactivo) */

$(document).ready(function() {
    let map = null;
    let userMarker = null;
    let businessMarker = null;
    let routingControl = null;
    
    const BUSINESS_COORDS = [40.42304, -3.70694];
    const BUSINESS_NAME = "Olympus Cars";
    const BUSINESS_ADDRESS = "Calle de la Luna, 12<br>28004 Madrid, España";
    const BUSINESS_PHONE = "+34 955 786 544";

    const geoOptions = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 300000
    };

    initMap();
    initScrollEffects();
    initScrollTop();
    initMapControls();

    function initMap() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                successGeolocation,
                errorGeolocation,
                geoOptions
            );
        } else {
            createMapWithoutUserLocation();
        }
    }

    function successGeolocation(position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        createMap([userLat, userLng]);
        addUserMarker([userLat, userLng]);
        addBusinessMarker();
        fitMapToBounds();
    }

    function errorGeolocation(error) {
        let errorMsg = 'No se pudo obtener tu ubicación';
        
        switch(error.code) {
            case error.PERMISSION_DENIED:
                errorMsg = 'Permiso de geolocalización denegado';
                break;
            case error.POSITION_UNAVAILABLE:
                errorMsg = 'Ubicación no disponible';
                break;
            case error.TIMEOUT:
                errorMsg = 'Tiempo de espera agotado para obtener ubicación';
                break;
        }
        
        console.warn('Error de geolocalización:', errorMsg);
        createMapWithoutUserLocation();
    }

    function createMap(userCoords) {
        map = L.map('map', {
            center: userCoords,
            zoom: 12,
            zoomControl: true,
            scrollWheelZoom: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);
    }

    function createMapWithoutUserLocation() {
        map = L.map('map', {
            center: BUSINESS_COORDS,
            zoom: 15,
            zoomControl: true,
            scrollWheelZoom: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        addBusinessMarker();
    }

    function addUserMarker(coords) {
        if (!map) {
            console.warn('El mapa no está inicializado');
            return;
        }

        const userIcon = L.divIcon({
            className: 'custom-marker-user',
            html: '<div style="background: #4285F4; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        userMarker = L.marker(coords, { icon: userIcon })
            .addTo(map)
            .bindPopup('<strong>Tu ubicación</strong>')
            .openPopup();
    }

    function addBusinessMarker() {
        if (!map) {
            console.warn('El mapa no está inicializado');
            return;
        }

        const businessIcon = L.divIcon({
            className: 'custom-marker-business',
            html: `
                <div style="position: relative;">
                    <div style="
                        background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
                        width: 40px;
                        height: 40px;
                        border-radius: 50% 50% 50% 0;
                        transform: rotate(-45deg);
                        border: 3px solid #000;
                        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">
                        <i class="fas fa-gem" style="
                            color: #000;
                            font-size: 18px;
                            transform: rotate(45deg);
                        "></i>
                    </div>
                </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });

        const popupContent = `
            <div style="font-family: 'Montserrat', sans-serif; min-width: 200px;">
                <h3 style="
                    font-family: 'Playfair Display', serif;
                    color: #D4AF37;
                    margin-bottom: 0.5rem;
                    font-size: 1.25rem;
                ">${BUSINESS_NAME}</h3>
                <p style="margin: 0.5rem 0; color: #333; line-height: 1.5;">
                    <i class="fas fa-map-marker-alt" style="color: #D4AF37; margin-right: 0.5rem;"></i>
                    ${BUSINESS_ADDRESS}
                </p>
                <p style="margin: 0.5rem 0; color: #333;">
                    <i class="fas fa-phone" style="color: #D4AF37; margin-right: 0.5rem;"></i>
                    <a href="tel:${BUSINESS_PHONE.replace(/\s/g, '')}" style="color: #D4AF37; text-decoration: none; font-weight: 500;">
                        ${BUSINESS_PHONE}
                    </a>
                </p>
                <p style="margin: 0.5rem 0 0; color: #666; font-size: 0.9rem;">
                    <i class="fas fa-clock" style="color: #D4AF37; margin-right: 0.5rem;"></i>
                    Lun-Vie: 9:00-14:00 / 17:00-20:00
                </p>
            </div>
        `;

        businessMarker = L.marker(BUSINESS_COORDS, { icon: businessIcon })
            .addTo(map)
            .bindPopup(popupContent, {
                maxWidth: 300,
                className: 'custom-popup'
            })
            .openPopup();
    }

    function fitMapToBounds() {
        if (userMarker && businessMarker) {
            const group = L.featureGroup([userMarker, businessMarker]);
            map.fitBounds(group.getBounds().pad(0.2));
        }
    }

    function initMapControls() {
        $('#centerMapBtn').on('click', function() {
            if (userMarker && businessMarker) {
                fitMapToBounds();
            } else if (businessMarker) {
                map.setView(BUSINESS_COORDS, 15);
            }
            businessMarker.openPopup();
        });

        $('#routeBtn').on('click', function() {
            if (userMarker) {
                calculateRoute();
            } else {
                showNotification('Necesitamos tu ubicación para calcular la ruta', 'info');
                requestUserLocation();
            }
        });
    }

    function calculateRoute() {
        if (!userMarker) {
            showNotification('No se pudo obtener tu ubicación', 'error');
            return;
        }

        if (routingControl) {
            map.removeControl(routingControl);
        }

        routingControl = L.Routing.control({
            waypoints: [
                userMarker.getLatLng(),
                L.latLng(BUSINESS_COORDS)
            ],
            language: 'es',
            routeWhileDragging: false,
            showAlternatives: true,
            altLineOptions: {
                styles: [
                    { color: '#D4AF37', opacity: 0.5, weight: 5 }
                ]
            },
            lineOptions: {
                styles: [
                    { color: '#D4AF37', opacity: 0.8, weight: 6 }
                ]
            },
            createMarker: function() { return null; },
        }).addTo(map);

        showNotification('Ruta calculada correctamente', 'success');
    }

    function requestUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    
                    // Asegurar que el mapa existe
                    if (!map) {
                        createMap([userLat, userLng]);
                    }
                    
                    if (!userMarker) {
                        addUserMarker([userLat, userLng]);
                        fitMapToBounds();
                    } else {
                        // Actualizar posición del marcador existente
                        userMarker.setLatLng([userLat, userLng]);
                        map.setView([userLat, userLng], 12);
                    }
                    
                    calculateRoute();
                },
                function(error) {
                    showNotification('No se pudo obtener tu ubicación: ' + error.message, 'error');
                },
                geoOptions
            );
        }
    }

    function showNotification(message, type = 'info') {
        const colors = {
            success: '#25D366',
            error: '#FF4444',
            info: '#D4AF37'
        };

        const notification = $(`
            <div style="
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${colors[type]};
                color: #000;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10000;
                font-weight: 500;
                animation: slideIn 0.3s ease;
            ">
                ${message}
            </div>
        `);

        $('body').append(notification);

        setTimeout(() => {
            notification.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
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

    $('a[href^="tel:"]').on('click', function() {
        $(this).addClass('calling');
        setTimeout(() => {
            $(this).removeClass('calling');
        }, 1000);
    });
});