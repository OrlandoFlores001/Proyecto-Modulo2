const botonLogout = document.getElementById("logout");
if (botonLogout) {
    botonLogout.addEventListener("click", function() {
        localStorage.removeItem("usuarioLogueado");
        window.location.href = "login.html";
    });
}

const formEnviar = document.getElementById("form-enviar");
if (formEnviar) {
    formEnviar.addEventListener("submit", function(e) {
        e.preventDefault();

        const destinatario = document.getElementById("destinatario").value.trim();
        const montoEnviar = Number(document.getElementById("monto").value);
        const mensajeErrorDiv = document.getElementById("mensaje-error");

        mensajeErrorDiv.innerHTML = "";
        let saldoActual = Number(localStorage.getItem("saldo")) || 0;

        if (montoEnviar > saldoActual) {
            mensajeErrorDiv.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <i class="ri-error-warning-line me-2"></i> Saldo insuficiente. Tu saldo actual es de $${saldoActual.toLocaleString("es-CL")}.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            return;
        }

        saldoActual -= montoEnviar;
        localStorage.setItem("saldo", saldoActual);

        let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
        
        const nuevoMovimiento = {
            tipo: "Envío",
            detalle: `Transferencia a ${destinatario}`,
            monto: montoEnviar,
            claseMonto: "text-danger", 
            signo: "-"
        };
        
        transacciones.push(nuevoMovimiento);
        localStorage.setItem("transacciones", JSON.stringify(transacciones));

        alert(`¡Transferencia realizada con éxito a ${destinatario}!`);
        window.location.href = "menu.html";
    });
}