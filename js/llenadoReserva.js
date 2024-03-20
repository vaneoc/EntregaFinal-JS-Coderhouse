// Función para llenar el select de profesionales según la especialidad seleccionada
async function llenarProfesionales() {
    try {
        const especialidad = document.getElementById('especialidad').value; 
        const selectProfesional = document.getElementById('profesional'); 
        selectProfesional.innerHTML = '';

        // Realizar la petición para obtener los datos del JSON
        const response = await fetch('../db/data.json'); 
        if (!response.ok) {
            throw new Error('Error al cargar los datos'); 
        }

        const data = await response.json(); // Convertir la respuesta a JSON
        const profesionales = data[especialidad]; 
        Object.keys(profesionales).forEach(profesional => {
            const option = document.createElement('option');
            option.value = profesional; 
            selectProfesional.add(option);
        });

       
    } catch (error) { 
        console.error('Error:', error); 
    } finally { // Ejecutar código independientemente de si hubo un error o no
        console.log('Fin de la función llenarProfesionales'); 
    }
}

document.getElementById('especialidad').addEventListener('change', llenarProfesionales);

// Función para llenar el select de horas según la especialidad, profesional y fecha seleccionados
async function llenarHoras() {
    try {
        const selectHora = document.getElementById('hora'); 
        const fechaInput = document.getElementById('fecha');
        const fecha = new Date(fechaInput.value);
        const diaSemana = fecha.getDay(); 

        // Verificar si la fecha está dentro del rango de marzo y abril de 2024 y es un día laborable
        if (
            fecha.getFullYear() === 2024 &&
            (fecha.getMonth() === 2 || fecha.getMonth() === 3) && 
            diaSemana >= 0 && diaSemana <= 4 
        ) {
            const especialidad = document.getElementById('especialidad').value;
            const profesional = document.getElementById('profesional').value; 

            
            const response = await fetch('../db/data.json'); 
            if (!response.ok) { 
                throw new Error('Error al cargar los datos'); 
            }

            const data = await response.json(); 
            const horasDisponibles = data[especialidad][profesional].horas; 

            // Llenar el select de horas
            selectHora.innerHTML = ''; 
            horasDisponibles.forEach(hora => { 
                const option = document.createElement('option'); 
                option.text = hora; 
                option.value = hora; 
                selectHora.add(option); 
            });
        } else { // Si la fecha no cumple con los criterios establecidos
            selectHora.innerHTML = ''; // Limpiar el select de horas
            throw new Error('Fecha no válida'); // Lanzar un error indicando que la fecha no es válida
        }
    } catch (error) { 
        // Mostrar la alerta solo si la excepción se debe a una fecha no válida
        if (error.message === 'Fecha no válida') {
            console.error('Error:', error);
            Swal.fire({ 
                icon: 'warning',
                title: 'No existen horas disponibles', 
                text: 'No existen horas disponibles para la fecha seleccionada.', 
                confirmButtonText: 'Entendido' 
            });
        } else { // Si el error no está relacionado con una fecha no válida
            console.error('Error:', error); 
        }
    } finally { // Ejecutar código independientemente de si hubo un error o no
        console.log('Fin de la función llenarHoras'); 
    }
}

// Evento para actualizar las horas disponibles al cambiar la fecha
document.getElementById('fecha').addEventListener('change', llenarHoras); // Agregar un evento de cambio a la fecha que llame a la función llenarHoras
