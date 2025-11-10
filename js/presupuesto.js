/* OLYMPUS CARS - Formulario de Presupuesto */

$(document).ready(function() {
    console.log('Formulario de presupuesto inicializado');
    
    initFormHandlers();
    initPriceCalculation();
    initRangeSlider();
    initServiceSelector();
    
    console.log('✓ Sistema de presupuesto listo');
});

function initFormHandlers() {
    const form = $('#presupuestoForm');
    
    $('#nombre, #apellidos, #telefono, #email').on('blur', function() {
        validateField($(this));
    });
    
    $('#servicio').on('change', function() {
        validateField($(this));
    });
    
    $('#privacidad').on('change', function() {
        validateField($(this));
    });
    
    form.on('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    form.on('reset', function() {
        setTimeout(function() {
            $('.form-group').removeClass('success error');
            updateBudgetSummary();
            console.log('Formulario reiniciado');
        }, 50);
    });
    
    console.log('✓ Manejadores del formulario inicializados');
}

// Validación de campos individuales
function validateField($field) {
    const fieldId = $field.attr('id');
    const fieldValue = $field.val().trim();
    const $formGroup = $field.closest('.form-group, .checkbox-group');
    
    let isValid = true;
    let errorMessage = '';
    
    switch(fieldId) {
        case 'nombre':
            const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
            if (!fieldValue) {
                isValid = false;
                errorMessage = 'El nombre es obligatorio';
            } else if (!nameRegex.test(fieldValue)) {
                isValid = false;
                errorMessage = 'El nombre solo puede contener letras (2-50 caracteres)';
            }
            break;
            
        case 'apellidos':
            const apellidosRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,100}$/;
            if (!fieldValue) {
                isValid = false;
                errorMessage = 'Los apellidos son obligatorios';
            } else if (!apellidosRegex.test(fieldValue)) {
                isValid = false;
                errorMessage = 'Los apellidos solo pueden contener letras (2-100 caracteres)';
            }
            break;
            
        case 'telefono':
            const telRegex = /^[6-9]\d{8}$/;
            if (!fieldValue) {
                isValid = false;
                errorMessage = 'El teléfono es obligatorio';
            } else if (!telRegex.test(fieldValue)) {
                isValid = false;
                errorMessage = 'Formato válido: 9 dígitos empezando por 6, 7, 8 o 9';
            }
            break;
            
        case 'email':
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!fieldValue) {
                isValid = false;
                errorMessage = 'El email es obligatorio';
            } else if (!emailRegex.test(fieldValue)) {
                isValid = false;
                errorMessage = 'Introduce un correo electrónico válido';
            }
            break;
            
        case 'servicio':
            if (!fieldValue) {
                isValid = false;
                errorMessage = 'Debes seleccionar un servicio';
            }
            break;
            
        case 'privacidad':
            if (!$field.is(':checked')) {
                isValid = false;
                errorMessage = 'Debes aceptar la política de privacidad';
            }
            break;
    }
    
    // Aplicar estilos de validación
    if (isValid) {
        $formGroup.removeClass('error').addClass('success');
    } else {
        $formGroup.removeClass('success').addClass('error');

        if (errorMessage) {
            $formGroup.find('.error-message').text(errorMessage);
        }
    }
    
    return isValid;
}


// VALIDACIÓN COMPLETA DEL FORMULARIO


function validateForm() {
    let isFormValid = true;

    const requiredFields = ['#nombre', '#apellidos', '#telefono', '#email', '#servicio', '#privacidad'];
    
    requiredFields.forEach(function(fieldSelector) {
        const $field = $(fieldSelector);
        if (!validateField($field)) {
            isFormValid = false;
        }
    });
    
    // Si hay errores, scroll al primer campo con error
    if (!isFormValid) {
        const $firstError = $('.form-group.error').first();
        if ($firstError.length) {
            $('html, body').animate({
                scrollTop: $firstError.offset().top - 100
            }, 500);
        }
    }
    
    return isFormValid;
}


// ENVÍO DEL FORMULARIO


function submitForm() {
    const formData = {
        nombre: $('#nombre').val(),
        apellidos: $('#apellidos').val(),
        telefono: $('#telefono').val(),
        email: $('#email').val(),
        servicio: $('#servicio option:selected').text(),
        vehiculo: $('#vehiculo option:selected').text() || 'N/A',
        plazo: $('#plazo').val(),
        extras: getSelectedExtras(),
        comentarios: $('#comentarios').val(),
        newsletter: $('#newsletter').is(':checked'),
        presupuestoTotal: $('#precioTotal').text()
    };
    
    console.log('Datos del formulario:', formData);
    
    // Mostrar mensaje de éxito
    showSuccessMessage();
    
    // En producción, aquí harías un AJAX call:
    /*
    $.ajax({
        url: '/api/presupuesto',
        method: 'POST',
        data: formData,
        success: function(response) {
            showSuccessMessage();
        },
        error: function(error) {
            showErrorMessage();
        }
    });
    */
}


function getSelectedExtras() {
    const extras = [];
    $('input[name="extras"]:checked').each(function() {
        extras.push({
            nombre: $(this).next('label').find('.extra-name').text(),
            precio: $(this).val()
        });
    });
    return extras;
}


function showSuccessMessage() {
    const message = `
        <div class="success-overlay">
            <div class="success-modal">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>¡Solicitud Enviada!</h2>
                <p>Hemos recibido tu solicitud de presupuesto.</p>
                <p>Nos pondremos en contacto contigo en las próximas 24 horas.</p>
                <button class="btn btn-primary" onclick="closeSuccessMessage()">
                    <i class="fas fa-times"></i> Cerrar
                </button>
            </div>
        </div>
    `;
    
    $('body').append(message);
    $('.success-overlay').fadeIn();
}


window.closeSuccessMessage = function() {
    $('.success-overlay').fadeOut(function() {
        $(this).remove();
        $('#presupuestoForm')[0].reset();
        $('.form-group').removeClass('success error');
        updateBudgetSummary();
    });
};


// CÁLCULO DE PRECIOS


function initPriceCalculation() {

    $('#servicio').on('change', updateBudgetSummary);
    
    // Actualizar precio cuando cambie el vehículo
    $('#vehiculo').on('change', updateBudgetSummary);

    $('input[name="extras"]').on('change', updateBudgetSummary);

    $('#plazo').on('input', updateBudgetSummary);
    
    // Cálculo inicial
    updateBudgetSummary();
    
    console.log('✓ Sistema de cálculo de precios inicializado');
}


function updateBudgetSummary() {

    const servicioSelect = $('#servicio');
    const precioServicio = parseInt(servicioSelect.find('option:selected').data('precio')) || 0;
    
    // Obtener precio del vehículo
    const vehiculoSelect = $('#vehiculo');
    const precioVehiculo = parseInt(vehiculoSelect.val()) || 0;

    let precioExtras = 0;
    $('input[name="extras"]:checked').each(function() {
        precioExtras += parseInt($(this).val()) || 0;
    });
    
    // Calcular multiplicador por plazo (opcional)
    const plazo = parseInt($('#plazo').val()) || 12;
    const multiplicadorPlazo = 1; // Puedes ajustar esto si quieres que el plazo afecte el precio

    const total = (precioServicio + precioVehiculo + precioExtras) * multiplicadorPlazo;

    $('#precioBase').text(formatPrice(precioServicio));
    $('#precioVehiculo').text(formatPrice(precioVehiculo));
    $('#precioExtras').text(formatPrice(precioExtras));
    $('#precioTotal').text(formatPrice(total));
    
    // Añadir animación al total
    $('#precioTotal').addClass('price-update');
    setTimeout(function() {
        $('#precioTotal').removeClass('price-update');
    }, 500);
}


function formatPrice(price) {
    return '€' + price.toLocaleString('es-ES');
}


// RANGE SLIDER - PLAZO


function initRangeSlider() {
    const $slider = $('#plazo');
    const $display = $('#plazoValue');

    $slider.on('input', function() {
        const value = $(this).val();
        $display.text(value + ' meses');
    });

    $display.text($slider.val() + ' meses');
    
    console.log('✓ Slider de plazo inicializado');
}

function initServiceSelector() {
    const $servicioSelect = $('#servicio');
    const $vehiculoGroup = $('#vehiculoGroup');
    
    $servicioSelect.on('change', function() {
        const selectedService = $(this).val();
        
        // Mostrar selector de vehículo solo si el servicio es "compra"
        if (selectedService === 'compra') {
            $vehiculoGroup.slideDown();
            $('#vehiculo').prop('required', true);
        } else {
            $vehiculoGroup.slideUp();
            $('#vehiculo').prop('required', false).val('');
            updateBudgetSummary();
        }
    });
    
    console.log('✓ Selector de servicio inicializado');
}


// ESTILOS DINÁMICOS

// Añadir estilos para la animación de actualización de precio
$('<style>')
    .prop('type', 'text/css')
    .html(`
        .price-update {
            animation: priceFlash 0.5s ease;
        }
        
        @keyframes priceFlash {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
                color: #FFD700;
            }
        }
        
        .success-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        
        .success-modal {
            background: #1A1A1A;
            padding: 3rem;
            border-radius: 12px;
            border: 2px solid #D4AF37;
            text-align: center;
            max-width: 500px;
            animation: modalSlideIn 0.5s ease;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .success-icon {
            font-size: 4rem;
            color: #228B22;
            margin-bottom: 1.5rem;
        }
        
        .success-modal h2 {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            color: #D4AF37;
            margin-bottom: 1rem;
        }
        
        .success-modal p {
            color: #B0B0B0;
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .success-modal .btn {
            margin-top: 1.5rem;
        }
    `)
    .appendTo('head');

function showTooltip($element, message) {
    const $tooltip = $('<div class="field-tooltip">' + message + '</div>');
    $element.parent().append($tooltip);
    
    setTimeout(function() {
        $tooltip.fadeOut(function() {
            $(this).remove();
        });
    }, 3000);
}


// LOG DE INICIALIZACIÓN

console.log(`
╔═══════════════════════════════════════════╗
║   FORMULARIO DE PRESUPUESTO ACTIVO       ║
║        Validación y Cálculos OK          ║
╚═══════════════════════════════════════════╝
`);

