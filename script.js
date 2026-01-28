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
    $(document).ready(function() {
    // ... (Tu código anterior) ...

    // Al hacer clic en "Nuestra historia..."
    $("#btn-historia").click(function() {
        // Ocultamos la escena 2 (burbujas)
        $("#escena-2").fadeOut(500, function() {
            // Mostramos la escena 3 (timeline)
            $("#escena-3").removeClass("hidden").fadeIn();
            // Agregamos una clase para activar animaciones si quieres
            $("#escena-3").addClass("mostrar-timeline");
            /* Asegúrate de tener estas líneas para que todos bailen al entrar */
        });
    });

    // Botón para reiniciar todo (opcional, por si quieren verlo de nuevo)
    $("#btn-volver").click(function() {
        $("#escena-3").fadeOut(500, function() {
            // Recargamos la página para reiniciar la carta
            location.reload(); 
        });
    });
});
    // Función extraída de Love You ❤️.html
    function iniciarBurbujas() {
        const phrases = ["Te amo ❤️", "Eres increíble ✨", "Siempre juntos 💖", "Mi lugar favorito eres tú ❤️‍🩹", "Me encantas ❣️", "Me enloqueces 🥰", "Tan linda e inteligente 😍", "Eres la mejor 🥺", "Lo vales todo mami 💫"];
        setInterval(() => {
            const bubble = document.createElement("div");
            bubble.className = "bubble";
            bubble.innerText = phrases[Math.floor(Math.random() * phrases.length)];
            bubble.style.left = Math.random() * 90 + "vw";
            bubble.style.animationDuration = (Math.random() * 3 + 5) + "s";
            document.getElementById("bubble-container").appendChild(bubble);
            setTimeout(() => bubble.remove(), 8000);
        }, 500);
    }
    // --- LÓGICA DEL CARRUSEL AUTOMÁTICO ---
    
    // Recorremos cada carrusel que exista en la página
    $(".carousel").each(function() {
        var $carousel = $(this);
        var $images = $carousel.find("img");
        
        // Si hay más de una foto, creamos los puntitos
        if ($images.length > 1) {
            var $dotsContainer = $('<div class="carousel-dots"></div>');
            
            // Por cada foto, creamos un punto
            $images.each(function(index) {
                var $dot = $('<span class="dot"></span>');
                
                // Si es la primera foto, activamos el primer punto
                if (index === 0) $dot.addClass("active");
                
                // Al hacer clic en el punto
                $dot.click(function() {
                    // Quitamos la clase active de todos los puntos y fotos de ESTE carrusel
                    $carousel.find(".dot").removeClass("active");
                    $images.removeClass("active");
                    
                    // Activamos el punto clicado y la foto correspondiente
                    $(this).addClass("active");
                    $($images[index]).addClass("active");
                });
                
                $dotsContainer.append($dot);
            });
            
            $carousel.append($dotsContainer);
        }
    });
});
