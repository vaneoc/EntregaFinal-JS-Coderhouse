// Función para llenar el select de profesionales y horas según la especialidad seleccionada
async function llenarProfesionalesYHoras() {
    try {
        const especialidad = document.getElementById('especialidad').value;
        const selectProfesional = document.getElementById('profesional');
        const selectHora = document.getElementById('hora');

        // Realizar la petición para obtener los datos del JSON
        const response = await fetch('../db/data.json');
        if (!response.ok) {
            throw new Error('Error al cargar los datos');
        }

        const data = await response.json(); // Convertir la respuesta a JSON
        const profesionales = data[especialidad];

        // Limpiar select de profesionales y horas
        selectProfesional.innerHTML = '';
        selectHora.innerHTML = '';

        // Llenar select de profesionales y horas
        Object.keys(profesionales).forEach(profesional => {
            const optionProfesional = document.createElement('option');
            optionProfesional.value = profesional;
            optionProfesional.textContent = profesional; // Agregar el nombre del profesional como texto de la opción
            selectProfesional.add(optionProfesional);

            // Llenar select de horas
            const horasDisponibles = profesionales[profesional].horas;
            horasDisponibles.forEach(hora => {
                const optionHora = document.createElement('option');
                optionHora.text = hora;
                optionHora.value = hora;
                selectHora.add(optionHora);
            });
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        console.log('Fin de la función llenarProfesionalesYHoras');
    }
}

document.getElementById('especialidad').addEventListener('change', llenarProfesionalesYHoras);

// Función para guardar la reserva en el almacenamiento local
function guardarReserva(reserva) {
    let reservas = JSON.parse(localStorage.getItem('reservas')) || []; // Obtener las reservas almacenadas o crear un array vacío si no hay reservas

    reservas.push(reserva); // Agregar la nueva reserva
    localStorage.setItem('reservas', JSON.stringify(reservas)); // Guardar las reservas actualizadas en el almacenamiento local
}

// Función para obtener y mostrar todas las reservas almacenadas
function mostrarReservas() {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || []; 
    const reservasContainer = document.getElementById('reservas-container');
    reservasContainer.innerHTML = ''; 

    reservas.forEach((reserva, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${reserva.nombreNino}</td>
            <td>${reserva.edadNino}</td>
            <td>${reserva.nombreCuidador}</td>
            <td>${reserva.telefono}</td>
            <td>${reserva.email}</td>
            <td><button class="btn btn-primary btn-sm" onclick="editarReserva(${index})">Editar</button></td>
            <td><button class="btn btn-danger btn-sm" onclick="borrarReserva(${index})">Borrar</button></td>
        `;
        reservasContainer.appendChild(row);
    });
}

// Función para eliminar una reserva específica
function borrarReserva(index) {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas.splice(index, 1); // Eliminar la reserva del array
    localStorage.setItem('reservas', JSON.stringify(reservas)); // Actualizar las reservas en el almacenamiento local
    mostrarReservas(); // Mostrar las reservas actualizadas
}

// Función para editar una reserva específica
function editarReserva(index) {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const reserva = reservas[index];

    // Llenar el formulario con los datos de la reserva seleccionada
    document.getElementById("nombre-nino").value = reserva.nombreNino;
    document.getElementById("edad-nino").value = reserva.edadNino;
    document.getElementById("nombre-cuidador").value = reserva.nombreCuidador;
    document.getElementById("telefono").value = reserva.telefono;
    document.getElementById("email").value = reserva.email;

    // Eliminar la reserva antigua después de editar
    reservas.splice(index, 1);
    localStorage.setItem('reservas', JSON.stringify(reservas));
}