$(document).ready(function() {
    var envelope = $('#envelope');
    var btn_open = $("#open");
    var btn_reset = $("#reset");

    envelope.click(function() { open(); });
    btn_open.click(function() { open(); });
    btn_reset.click(function() { close(); });

    function open() {
        envelope.addClass("open").removeClass("close");
        
        // Esperamos a que la carta suba y luego mostramos la escena 2
        setTimeout(function() {
            $(".envlope-wrapper, .reset").fadeOut(1000, function() {
                $("#escena-2").fadeIn().removeClass("hidden");
                iniciarBurbujas(); // Llamamos a la función de las burbujas
            });
        }, 3000);
    }

    function close() {
        envelope.addClass("close").removeClass("open");
    }

    // --- BOTÓN PARA IR A LA ESCENA 3 (HISTORIA) ---
    $("#btn-historia").click(function() {
        // Ocultamos la escena 2
        $("#escena-2").fadeOut(500, function() {
            // Mostramos la escena 3 y forzamos su visualización
            $("#escena-3").removeClass("hidden").css("display", "block").hide().fadeIn(1000);
            $("#escena-3").addClass("mostrar-timeline");
        });
    });

   // --- LÓGICA DE LA LLUVIA DE MENSAJES (CORREGIDA) ---
    function iniciarBurbujas() {
        const messages = [
            "Te amo muchísimo ❤️", "Gracias por estar en mi vida 🌟", "Me enloqueces 🥰",
            "Eres mi persona favorita 💕", "Juntos por siempre 🥰", "Tan linda e inteligente 😍",
            "Tú y yo, para siempre 💖", "Tu sonrisa me ilumina 💫", "Lo vales todo mami 💫",
            "Eres lo mejor que me ha pasado 😍", "Cada momento contigo es mágico ✨",
            "Siempre pienso en ti 💭", "Mi corazón es tuyo 💘"
        ];

        setInterval(() => {
            // Solo creamos burbujas si la escena 2 es visible
            if ($("#escena-2").is(":visible")) {
                const bubble = document.createElement("div");
                bubble.className = "text-bubble"; // Usamos la clase del CSS original
                
                // Usamos la variable correcta 'messages'
                bubble.innerText = messages[Math.floor(Math.random() * messages.length)];

                // Posición aleatoria simple (sin cálculos complejos que fallan)
                bubble.style.left = Math.random() * 80 + 10 + "vw"; 
                bubble.style.top = Math.random() * 80 + 10 + "vh";

                // Añadimos al ID correcto
                const container = document.getElementById("bubbles-text");
                if (container) {
                    container.appendChild(bubble);
                    // Eliminar después de 8s
                    setTimeout(() => bubble.remove(), 8000);
                }
            }
        }, 500);
    }
    
    // --- LÓGICA DEL CARRUSEL (FOTOS, VIDEOS Y SWIPE TÁCTIL) ---
    $(".carousel").each(function() {
        var $carousel = $(this);
        var $mediaItems = $carousel.find("img, video");
        var $dotsContainer = $('<div class="carousel-dots"></div>');
        
        // Variables para el control táctil
        var touchStartX = 0;
        var touchEndX = 0;

        if ($mediaItems.length > 1) {
            
            // 1. CREAR LOS PUNTITOS
            $mediaItems.each(function(index) {
                var $dot = $('<span class="dot"></span>');
                if (index === 0) $dot.addClass("active");

                // Evento Clic en el punto
                $dot.click(function() {
                    cambiarDiapositiva(index);
                });
                
                $dotsContainer.append($dot);
            });
            $carousel.append($dotsContainer);

            // 2. FUNCIÓN PARA CAMBIAR DE DIAPOSITIVA
            function cambiarDiapositiva(newIndex) {
                // Pausar videos antes de cambiar
                $("video").each(function() { this.pause(); });

                // Actualizar clases visuales
                $carousel.find(".dot").removeClass("active");
                $mediaItems.removeClass("active");

                // Activar el nuevo
                $($carousel.find(".dot")[newIndex]).addClass("active");
                $($mediaItems[newIndex]).addClass("active");
            }

            // 3. LÓGICA DE SWIPE (DESLIZAR)
            $carousel.on('touchstart', function(event) {
                touchStartX = event.originalEvent.changedTouches[0].screenX;
            });

            $carousel.on('touchend', function(event) {
                touchEndX = event.originalEvent.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                // Obtenemos el índice de la foto actual
                var currentIndex = $mediaItems.filter(".active").index();
                
                // Detectar Swipe a la IZQUIERDA (Siguiente)
                if (touchEndX < touchStartX - 50) {
                    var nextIndex = currentIndex + 1;
                    if (nextIndex >= $mediaItems.length) nextIndex = 0; // Volver al inicio
                    cambiarDiapositiva(nextIndex);
                }
                
                // Detectar Swipe a la DERECHA (Anterior)
                if (touchEndX > touchStartX + 50) {
                    var prevIndex = currentIndex - 1;
                    if (prevIndex < 0) prevIndex = $mediaItems.length - 1; // Ir al final
                    cambiarDiapositiva(prevIndex);
                }
            }
        }
    });

    // Botón volver (opcional)
    $("#btn-volver").click(function() {
        location.reload();
    });
});