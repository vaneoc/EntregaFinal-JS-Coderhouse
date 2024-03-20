document.addEventListener("DOMContentLoaded", function() {
    
    document.getElementById("nombre-nino").value = "Juan Pérez"; 
    document.getElementById("edad-nino").value = "10";
    document.getElementById("nombre-cuidador").value = "María García"; 
    document.getElementById("telefono").value = "+56912345678"; 
    document.getElementById("email").value = "ejemplo@correo.com"; 

    
    document.getElementById("formulario").addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        // Obtener los valores de los campos del formulario
        let nombreNino = document.getElementById("nombre-nino").value;
        let edadNino = document.getElementById("edad-nino").value;
        let nombreCuidador = document.getElementById("nombre-cuidador").value;
        let telefono = document.getElementById("telefono").value;
        let email = document.getElementById("email").value; 

        // Validar si la edad del paciente es menor de 18 años
        if (parseInt(edadNino) >= 18) { // Convierte la edad del niño a un número entero y verifica si es mayor o igual a 18
            Swal.fire({
                title: '¡Error!',
                text: 'La edad del paciente debe ser menor de 18 años',
                icon: 'error',
                customClass: {
                    popup: 'custom-font'
                },
                confirmButtonText: 'Ok' 
            });
            return; 
        }

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
    });
});
