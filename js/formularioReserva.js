document.getElementById('reservar-btn').addEventListener('click', function(event) {
    event.preventDefault(); 

    // Obtener los datos seleccionados por el usuario
    const especialidad = document.getElementById('especialidad').value;
    const profesional = document.getElementById('profesional').value; 
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

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
            localStorage.setItem('reserva', JSON.stringify(reserva)); 

            
            setTimeout(() => { // Simular un tiempo de espera antes de mostrar la alerta de éxito
                const mensaje = `La hora para ${especialidad} con ${profesional} el ${fecha} a las ${hora} ha sido reservada con éxito. Se enviará un correo con la información de la cita.`; 
                Swal.fire({
                    icon: 'success',
                    title: 'Reserva exitosa',
                    text: mensaje
                });
            }, 2000); // Simulación de tiempo de espera para el envío de correo (2 segundos)
        }
    });
});
