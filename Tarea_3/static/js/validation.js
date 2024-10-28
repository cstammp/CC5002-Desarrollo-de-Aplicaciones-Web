// --- Funciones de Validación ---

const validateName = (name) => {
    if(!name) return false;
    let lengthValid = name.trim().length >= 3 && name.trim().length <= 80;
    return lengthValid;   
}

const validateEmail = (email) => {
    if (!email) return false;
    let lengthValid = email.length >= 5;

    // validamos el formato
    let regex = /^[\w.-]+@[a-zA-Z\d-]+(\.[a-zA-Z]{2,6})+$/;
    let formatValid = regex.test(email);

    return lengthValid && formatValid;
};

const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return false;
    // validación de longitud
    let lengthValid = phoneNumber.length >= 8;

    // validación de formato
    let regex = /^[0-9]+$/;
    let formatValid = regex.test(phoneNumber);

    return lengthValid && formatValid;
};

const validateSelect = (select) => {
    if(!select) return false;
    return true;
}

const validateYears = (years) => {
    if(!years) return false;
    let formatValid = Number.isInteger(Number(years));
    let yearsValid = Number(years) >= 1 && Number(years) <= 99;
    return formatValid && yearsValid;
}

const validateFiles = (files) => {
    if (!files) return false;

    // validación del número de archivos
    let lengthValid = files.length >= 1 && files.length <= 3;

    // validación del tipo de archivo
    let typeValid = true;

    for (const file of files) {
        // el tipo de archivo debe ser "image/<foo>"
        let fileFamily = file.type.split("/")[0];
        typeValid &&= fileFamily == "image";
    }

    // devolvemos la lógica AND de las validaciones.
    return lengthValid && typeValid;
};

// --- Form Handling ---

const handleFormSubmit = () => {
    console.log("Validating form...");

    // Información de Contacto
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const regionInput = document.getElementById("region");
    const comunaInput = document.getElementById("comuna");

    const nameError = document.getElementById("name-error"); 
    const emailError = document.getElementById("email-error");
    const regionError = document.getElementById("region-error");
    const comunaError = document.getElementById("comuna-error");

    //Información del Dispositivo
    let deviceNameInputs = document.querySelectorAll(".deviceName");
    let deviceTypeInputs = document.querySelectorAll(".deviceType");
    let deviceAgeInputs = document.querySelectorAll(".deviceAge");
    let deviceStateInputs = document.querySelectorAll(".deviceState");
    let deviceImgInputs = document.querySelectorAll(".deviceImg");

    // variables auxiliares de validación y función.
    let isValid = true;

    // lógica de validación
    if (!validateName(nameInput.value)) {
        isValid = false;
        nameInput.style.borderColor = "red";
        nameError.textContent = "* Por favor ingresa un nombre válido";
    } else {
        nameInput.style.borderColor = "";
        nameError.textContent = "*";
    }

    if (!validateEmail(emailInput.value)) {
        isValid = false;
        emailInput.style.borderColor = "red";
        emailError.textContent = "* Por favor ingresa un correo electrónico válido";
    } else {
        emailInput.style.borderColor = "";
        emailError.textContent = "*";
    }

    if (!validateSelect(regionInput.value)) {
        isValid = false;
        regionInput.style.borderColor = "red";
        regionError.textContent = "* Por favor ingresa una región válida";
    } else {
        regionInput.style.borderColor = "";
        regionError.textContent = "*";
    }

    if (!validateSelect(comunaInput.value)) {
        isValid = false;
        comunaInput.style.borderColor = "red";
        comunaError.textContent = "* Por favor ingresa una comuna válida";
    } else {
        comunaInput.style.borderColor = "";
        comunaError.textContent = "*";
    }

    for (let i = 0; i < deviceNameInputs.length; i++) {
        const deviceNameError = document.getElementById(`device-name-error-${i}`);
        if (!validateName(deviceNameInputs[i].value)) {
            isValid = false;
            deviceNameInputs[i].style.borderColor = "red";
            deviceNameError.textContent = "* Por favor ingresa un nombre válido";
        } else {
            deviceNameInputs[i].style.borderColor = "";
            deviceNameError.textContent = "*";
        }
    };

    for (let i = 0; i < deviceTypeInputs.length; i++) {
        const deviceTypeError = document.getElementById(`device-type-error-${i}`);
        if (!validateSelect(deviceTypeInputs[i].value)) {
            isValid = false;
            deviceTypeInputs[i].style.borderColor = "red";
            deviceTypeError.textContent = "* Por favor ingresa un tipo válido";
        } else {
            deviceTypeInputs[i].style.borderColor = "";
            deviceTypeError.textContent = "*";
        }
    };
        
    for (let i = 0; i < deviceAgeInputs.length; i++) {
        const deviceAgeError = document.getElementById(`device-age-error-${i}`);
        if (!validateYears(deviceAgeInputs[i].value)) {
            isValid = false;
            deviceAgeInputs[i].style.borderColor = "red";
            deviceAgeError.textContent = "* Por favor ingresa un año válido";
        } else {
            deviceAgeInputs[i].style.borderColor = "";
            deviceAgeError.textContent = "*";
        }
    };

    for (let i = 0; i < deviceStateInputs.length; i++) {
        const deviceStateError = document.getElementById(`device-state-error-${i}`);
        if (!validateSelect(deviceStateInputs[i].value)) {
            isValid = false;
            deviceStateInputs[i].style.borderColor = "red";
            deviceStateError.textContent = "* Por favor ingresa un estado válido";
        } else {
            deviceStateInputs[i].style.borderColor = "";
            deviceStateError.textContent = "*";
        }
    };

    for (let i = 0; i < deviceImgInputs.length; i++) {
        const deviceImgError = document.getElementById(`device-img-error-${i}`);
        if (!validateFiles(deviceImgInputs[i].files)) {
            isValid = false;
            deviceImgInputs[i].style.borderColor = "red";
            deviceImgError.textContent = "* Por favor ingresa imágenes válidas";
        } else {
            deviceImgInputs[i].style.borderColor = "";
            deviceImgError.textContent = "*";
        }
    };

    // Mensaje de confirmación
    let donationForm = document.forms["donation-form"];
    let validationBox = document.getElementById("val-box");
    let validationMessage = document.getElementById("val-msg");
    let validationBtns = document.getElementById("val-btns");
    
    validationBtns.innerHTML = "";

    if (!isValid) {
        validationBox.hidden = false;
        validationMessage.innerText = "Hay errores en el formulario. Por favor, corrígelos.";
    } else {
        // Ocultar el formulario
        donationForm.style.display = "none";

        // establecer mensaje de éxito
        validationMessage.innerText = "¿Confirma que desea publicar esta donación?";

        // aplicar estilos de éxito
        validationBox.style.backgroundColor = "#ddffdd";
        validationBox.style.borderLeftColor = "#4CAF50";

        // Agregar botones para enviar el formulario o volver
        let submitButton = document.createElement("button");
        submitButton.className = "blue-btn";
        submitButton.innerText = "Sí, confirmo";
        submitButton.style.marginRight = "10px";
        submitButton.addEventListener("click", () => {
            validationMessage.innerText = "Hemos recibido la información de su donación. Muchas gracias.";
            validationBtns.removeChild(backButton);
            submitButton.innerText = "Regresar al inicio";
            
            // Redirigir al inicio cuando se haga clic en el botón
            submitButton.addEventListener("click", () => {
                // POST
                let form = document.getElementById("donation-form");
                form.submit();
            });
        });

        let backButton = document.createElement("button");
        backButton.className = "red-btn"
        backButton.innerText = "No, quiero volver al formulario";
        backButton.addEventListener("click", () => {
            // Mostrar el formulario nuevamente
            donationForm.style.display = "block";
            validationBox.hidden = true;
        });

        validationBtns.appendChild(submitButton);
        validationBtns.appendChild(backButton);

        // hacer visible el mensaje de validación
        validationBox.hidden = false;
    }
    
};  

// --- Event Listener ---

const submitButton = document.getElementById("submit-btn");
submitButton.addEventListener("click", handleFormSubmit);