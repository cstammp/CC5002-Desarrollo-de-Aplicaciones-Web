// --- Funciones de Validación ---

const validateName = (name) => {
    if(!name) return false;
    let lengthValid = name.trim().length >= 3 && name.trim().length <= 80;
    return lengthValid;   
}

const validateEmail = (email) => {
    if (!email) return false;
    let lengthValid = email.length > 15;

    // validamos el formato
    let regex = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
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
    let yearsValid = Number(years.trim()) >= 1 && Number(years.trim()) <= 99;
    let formatValid = Number.isInteger(Number(years.trim()));
    return yearsValid && formatValid;
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

};  

// --- Event Listener ---

const submitButton = document.getElementById("submit-btn");
submitButton.addEventListener("click", handleFormSubmit);