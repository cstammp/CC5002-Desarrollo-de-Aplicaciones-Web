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