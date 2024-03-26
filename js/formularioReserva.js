document.getElementById('fecha').addEventListener('change', function() {
    // Obtener la fecha seleccionada por el usuario
    const fechaSeleccionada = this.value;

    // Validar la fecha seleccionada
    const diaSeleccionado = new Date(fechaSeleccionada).getDay(); 
    const mesSeleccionado = new Date(fechaSeleccionada).getMonth();

    if (diaSeleccionado === 5 || diaSeleccionado === 6 || (mesSeleccionado !== 2 && mesSeleccionado !== 3)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'Lo sentimos, no se permiten reservas para la fecha seleccionada. Por favor elige otra fecha.',
        });

        // Deshabilitar el campo de selección de horas
        document.getElementById('hora').disabled = true;
    } else {
        // Habilitar el campo de selección de horas si la fecha es válida
        document.getElementById('hora').disabled = false;
    }
});

document.getElementById('reservar-btn').addEventListener('click', function(event) {
    event.preventDefault(); 

    // Obtener los datos seleccionados por el usuario
    const especialidad = document.getElementById('especialidad').value;
    const profesional = document.getElementById('profesional').value; 
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    // Validar que todos los campos del formulario estén completos
    if (especialidad === "" || profesional === "" || fecha === "" || hora === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor completa todos los campos.',
        });
        return;
    }

    // Mostrar alerta al usuario para confirmar la reserva
    Swal.fire({
        icon: 'question', 
        title: 'Confirmar reserva', 
        text: `¿Estás seguro de reservar una cita para ${especialidad} con ${profesional} el ${fecha} a las ${hora}?`,
        showCancelButton: true, 
        confirmButtonText: 'Sí, reservar', 
        cancelButtonText: 'Cancelar' 
    }).then((confirmacion) => { 
        if (confirmacion.isConfirmed) { 
            // Almacenar los datos de la reserva en el almacenamiento local (localStorage)
            const reserva = { 
                especialidad: especialidad, 
                profesional: profesional, 
                fecha: fecha, 
                hora: hora 
            };
            guardarReserva(reserva); 

            // Mostrar la alerta de éxito y redirigir a la página de inicio después de un tiempo de espera
            setTimeout(() => {
                const mensaje = `La hora para ${especialidad} con ${profesional} el ${fecha} a las ${hora} ha sido reservada con éxito. Se enviará un correo con la información de la cita.`; 
                Swal.fire({
                    icon: 'success',
                    title: 'Reserva exitosa',
                    text: mensaje
                }).then(() => {
                    // Redirigir a la página de inicio después de mostrar la alerta de éxito
                    window.location.href = "/index.html";
                });
            }, 2000); // Simulación de tiempo de espera para el envío de correo (2 segundos)
        }
    });
});

function guardarReserva(reserva) {
    let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));
}
