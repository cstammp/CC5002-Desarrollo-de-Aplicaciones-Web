//  --- Añadir formulario nuevo dispositivo ---
let contadorDispositivos = 0;

const addDeviceForm = () => {
    contadorDispositivos++;

    const text = document.createElement("h2");
    text.innerText = `Información del dispositivo ${contadorDispositivos}`;
    
    const deviceNameDiv = document.createElement("div");
    deviceNameDiv.classList.add("group-input");
    deviceNameDiv.innerHTML = `
        <label for="device-name-${contadorDispositivos}">Nombre dispositivo ${contadorDispositivos}<span id="device-name-error-${contadorDispositivos}" style="color:#ee0c0cc0">*</span></label>
        <input type="text" id="device-name-${contadorDispositivos}" name="device-name-${contadorDispositivos}" class="deviceName" minlength="3" maxlength="80" size="80" required>
    `;

    const deviceDescriptionDiv = document.createElement("div");
    deviceDescriptionDiv.classList.add("group-input");
    deviceDescriptionDiv.innerHTML = `
        <label for="description-${contadorDispositivos}">Descripción</label>
        <textarea id="description-${contadorDispositivos}" name="description-${contadorDispositivos}" class="deviceDescription" placeholder="Describe acá el dispositivo..." rows="4" cols="50"></textarea>
    `;

    const deviceTypeDiv = document.createElement("div");
    deviceTypeDiv.classList.add("group-input");
    deviceTypeDiv.innerHTML = `
        <label for="device-type-${contadorDispositivos}">Tipo <span id="device-type-error-${contadorDispositivos}" style="color:#ee0c0cc0">*</span></label>
        <select id="device-type-${contadorDispositivos}" name="device-type-${contadorDispositivos}" class="deviceType" required>
            <option value="">--- Seleccionar ---</option>
            <option value="pantalla">Pantalla</option>
            <option value="notebook">Notebook</option>
            <option value="tablet">Tablet</option>
            <option value="celular">Celular</option>
            <option value="consola">Consola</option>
            <option value="mouse">Mouse</option>
            <option value="teclado">Teclado</option>
            <option value="impresora">Impresora</option>
            <option value="parlante">Parlante</option>
            <option value="audifonos">Audífonos</option>
            <option value="otro">Otro</option>
        </select>
    `;

    const deviceAgeDiv = document.createElement("div");
    deviceAgeDiv.classList.add("group-input");
    deviceAgeDiv.innerHTML = `
        <label for="device-age-${contadorDispositivos}">Años de uso <span id="device-age-error-${contadorDispositivos}" style="color:#ee0c0cc0">*</span></label>
        <input type="number" id="device-age-${contadorDispositivos}" name="device-age-${contadorDispositivos}" class="deviceAge" min="1" max="99" step="1" size="3" required> 
    `;

    const deviceStateDiv = document.createElement("div");
    deviceStateDiv.classList.add("group-input");
    deviceStateDiv.innerHTML = `
        <label for="device-state-${contadorDispositivos}">Estado funcionamiento <span id="device-state-error-${contadorDispositivos}" style="color:#ee0c0cc0">*</span></label>
        <select id="device-state-${contadorDispositivos}" name="device-state-${contadorDispositivos}" class="deviceState" required>
            <option value="">--- Seleccionar ---</option>
            <option value="funciona perfecto">Funciona perfecto</option>
            <option value="funciona a medias">Funciona a medias</option>
            <option value="no funciona">No funciona</option>
        </select>
    `;

    const deviceImgDiv = document.createElement("div");
    deviceImgDiv.classList.add("group-input");
    deviceImgDiv.innerHTML = `
        <label for="img-device-${contadorDispositivos}">Foto de productos <span id="device-img-error-${contadorDispositivos}" style="color:#ee0c0cc0">*</span></label>
        <input type="file" id="img-device-${contadorDispositivos}" name="img-device-${contadorDispositivos}" class="deviceImg" accept="image/*" multiple required>
    `;

    document.getElementById("device-info").appendChild(text);
    document.getElementById("device-info").appendChild(deviceNameDiv);
    document.getElementById("device-info").appendChild(deviceDescriptionDiv);
    document.getElementById("device-info").appendChild(deviceTypeDiv);
    document.getElementById("device-info").appendChild(deviceAgeDiv);
    document.getElementById("device-info").appendChild(deviceStateDiv);
    document.getElementById("device-info").appendChild(deviceImgDiv);
};

document.getElementById("add-device").addEventListener('click', addDeviceForm);