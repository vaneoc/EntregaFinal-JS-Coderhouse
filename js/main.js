document.addEventListener("DOMContentLoaded", function() {
    // Llenar los campos del formulario con valores predeterminados
    document.getElementById("nombre-nino").value = "Juan Pérez";
    document.getElementById("edad-nino").value = "10";
    document.getElementById("nombre-cuidador").value = "María García";
    document.getElementById("telefono").value = "+56912345678";
    document.getElementById("email").value = "ejemplo@correo.com";

    // Agregar evento de escucha al formulario para la validación y envío
    document.getElementById("formulario").addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente
        validarYEnviarFormulario();
    });

    // Mostrar las reservas almacenadas
    mostrarReservas();
});

// Función para validar y enviar el formulario
function validarYEnviarFormulario() {
    if (validarFormulario()) {
        mostrarConfirmacion();
    }
}

// Función para validar el formulario de contacto
function validarFormulario() {
    const nombreNino = document.getElementById("nombre-nino").value;
    const edadNino = document.getElementById("edad-nino").value;
    const nombreCuidador = document.getElementById("nombre-cuidador").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;

    if (nombreNino === "" || edadNino === "" || nombreCuidador === "" || telefono === "" || email === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor completa todos los campos obligatorios.',
        });
        return false;
    }

    // Verificar la edad del usuario antes de permitir la reserva
    const edad = parseInt(edadNino);
    if (edad > 18) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes ser menor de 18 años para reservar una cita.',
        });
        return false;
    }

    return true;
}

// Función para mostrar la confirmación y redirigir a la página de reserva
function mostrarConfirmacion() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Los datos son correctos?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'No, corregir',
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, redirige a la página de reserva
            window.location.href = "pages/reserva.html";
        }
    });
}