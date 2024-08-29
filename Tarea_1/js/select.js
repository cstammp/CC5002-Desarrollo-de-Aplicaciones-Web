// Usar fetch para cargar el JSON region_comuna.json
fetch("../region_comuna.json")
    .then(response => response.json())
    .then(data => {
        // Poblar el select de region
        const selectRegion = document.getElementById('region');
        const selectComuna = document.getElementById('comuna');

        data.regiones.forEach(region => {
            const option = document.createElement('option');
            option.value = region.id;
            option.textContent = region.nombre;
            selectRegion.appendChild(option);
        });

        // Manejar el cambio de región
        selectRegion.addEventListener('change', function() {
            const selectedRegionId = parseInt(this.value);
            const selectedRegion = data.regiones.find(region => region.id === selectedRegionId);

            // Limpiar el select de comunas
            selectComuna.innerHTML = '<option value=""> --- Seleccionar Comuna --- </option>';

            // Poblar el select de comunas
            if (selectedRegion) {
                selectedRegion.comunas.forEach(comuna => {
                    const option = document.createElement('option');
                    option.value = comuna.id;
                    option.textContent = comuna.nombre;
                    selectComuna.appendChild(option);
                });
            }
        });
    })
    .catch(error => console.error('Error cargando el JSON:', error));

