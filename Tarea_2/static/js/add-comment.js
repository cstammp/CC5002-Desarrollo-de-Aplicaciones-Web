//  --- Funciones de Validación ---
const validateName = (name) => {
    if(!name) return false;
    let lengthValid = name.trim().length >= 3 && name.trim().length <= 80;
    return lengthValid;   
}

const validateText = (text) => {
    if(!text) return false;
    let lengthValid = text.trim().length >= 5;
    return lengthValid;   
}

//  --- Añadir comentario ---
const handleFormSubmit = () => {
    console.log("Validating form...");

    const nameInput = document.getElementById("name");
    const textInput = document.getElementById("text");

    const nameError = document.getElementById("name-error");
    const textError = document.getElementById("text-error");

    let isValid = true;

    if (!validateName(nameInput.value)) {
        isValid = false;
        nameInput.style.borderColor = "red";
        nameError.textContent = "* Por favor ingresa un nombre válido";
    } else {
        nameInput.style.borderColor = "";
        nameError.textContent = "*";
    }

    if (!validateText(textInput.value)) {
        isValid = false;
        textInput.style.borderColor = "red";
        textError.textContent = "* Por favor ingresa un comentario válido";
    } else {
        textInput.style.borderColor = "";
        textError.textContent = "*";
    }

    if (isValid){
        let form = document.getElementById("comment-form");
        form.submit();
    }    
}

// --- Event Listener ---
const submitButton = document.getElementById("submit-btn");
submitButton.addEventListener("click", handleFormSubmit);
