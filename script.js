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

    // --- LÓGICA DE TRANSICIÓN A LA SORPRESA FINAL ---

    // 1. Al hacer clic en el botón de la Escena 3
    $("#btn-sorpresa-final").click(function() {
        // Ocultamos la línea de tiempo suavemente
        $("#escena-3").fadeOut(500, function() {
            // Mostramos el contenedor de la secuencia de correo
            $("#secuencia-correo").fadeIn();
            // Activamos la primera pantalla
            $("#screen1").addClass("active-mail");
        });
    });

    // 2. Función para navegar entre las pantallas del correo
    // (La hacemos global para que el HTML 'onclick' pueda encontrarla)
    window.nextScreen = function(num) {
        // Ocultamos la actual
        $(".screen").removeClass("active-mail");
        
        // Mostramos la siguiente con una pequeña pausa para efecto
        setTimeout(function() {
            $("#screen" + num).addClass("active-mail");
        }, 100);
    };
    // --- LÓGICA DEL CONTADOR DE AMOR ---
    function actualizarContador() {
        // 1. PON AQUÍ LA FECHA DE INICIO DE SU RELACIÓN (Año, Mes-1, Día)
        // Ojo: Los meses en JS van de 0 a 11 (Enero=0, Febrero=1, etc.)
        // Ejemplo: Si empezaron el 14 de Febrero de 2024: new Date(2024, 1, 14)
        const fechaInicio = new Date(2025, 6, 16); // <--- ¡CAMBIA ESTO! (Mes 6 es Julio)
        const ahora = new Date();

        // Cálculos matemáticos
        let diferencia = ahora - fechaInicio;

        // Convertir a unidades de tiempo
        const segundosTotales = Math.floor(diferencia / 1000);
        const minutosTotales = Math.floor(segundosTotales / 60);
        const horasTotales = Math.floor(minutosTotales / 60);
        const diasTotales = Math.floor(horasTotales / 24);

        // Calcular años, meses y días (aproximación para visualización bonita)
        let years = ahora.getFullYear() - fechaInicio.getFullYear();
        let months = ahora.getMonth() - fechaInicio.getMonth();
        let days = ahora.getDate() - fechaInicio.getDate();

        // Ajustes si el mes/día actual es menor al de inicio
        if (days < 0) {
            months--;
            // Días del mes anterior para sumar
            const ultimoDiaMesAnterior = new Date(ahora.getFullYear(), ahora.getMonth(), 0).getDate();
            days += ultimoDiaMesAnterior;
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        // Si quieres mostrar el total de meses acumulados (ej: 14 meses) en vez de 1 año y 2 meses:
        // Descomenta la siguiente línea:
        // months = months + (years * 12); 

        const horas = ahora.getHours() - fechaInicio.getHours();
        const minutos = ahora.getMinutes() - fechaInicio.getMinutes();
        const segundos = ahora.getSeconds() - fechaInicio.getSeconds();
        
        // Ajuste fino para horas/min/seg negativos
        let h = horas, m = minutos, s = segundos;
        if (s < 0) { s += 60; m--; }
        if (m < 0) { m += 60; h--; }
        if (h < 0) { h += 24; } // (Los días ya se ajustaron arriba aproximademente, este contador es visual)

        // Actualizar el HTML
        // Nota: Puedes elegir mostrar 'months' (meses restantes del año) o calcular meses totales.
        // Aquí sumamos los años convertidos a meses para que diga "7 meses" o "19 meses"
        const mesesTotalesParaMostrar = months + (years * 12);

        $("#meses").text(mesesTotalesParaMostrar); 
        $("#dias").text(days);
        
        // Usamos la hora del sistema para el efecto "reloj"
        // O calculamos restantes:
        const segRestantes = Math.floor((diferencia / 1000) % 60);
        const minRestantes = Math.floor((diferencia / 1000 / 60) % 60);
        const horasRestantes = Math.floor((diferencia / (1000 * 60 * 60)) % 24);

        $("#horas").text(horasRestantes < 10 ? "0" + horasRestantes : horasRestantes);
        $("#minutos").text(minRestantes < 10 ? "0" + minRestantes : minRestantes);
        $("#segundos").text(segRestantes < 10 ? "0" + segRestantes : segRestantes);
    }

    // Actualizar cada segundo
    setInterval(actualizarContador, 1000);
    actualizarContador(); // Ejecutar una vez al inicio para que no salga en 0
});