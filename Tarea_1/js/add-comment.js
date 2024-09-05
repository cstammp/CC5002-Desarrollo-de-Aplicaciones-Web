const comments = [
    { date: '2023-10-03', name: 'Elsa Capuntas', text: 'Buena pantalla, me sirvió para la universidad.' },
    { date: '2024-01-19', name: 'Paredes del Campo', text: 'Le falta brillo, el resto bien.' }
];

//  --- Función para llenar los comentarios dinámicamente ---
const populateComments = () => {
    const commentList = document.getElementById('comment-list');
    commentList.innerHTML = '<h3>Comentarios sobre el dispositivo</h3>'; // Limpiar el contenido previo

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<b>${comment.name}</b> (${comment.date}):<br>${comment.text}<br><br>`;
        commentList.appendChild(commentDiv);
    });
}

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
        // Crear un nuevo comentario
        const newComment = {
            date: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
            name: nameInput.value,
            text: textInput.value
        };

        // Agregar el nuevo comentario al array
        comments.push(newComment);

        // Limpiar el formulario
        document.getElementById('comment-form').reset();

        // Volver a mostrar los comentarios
        populateComments();
    }    
}

// --- Event Listener ---
const submitButton = document.getElementById("submit-btn");
submitButton.addEventListener("click", handleFormSubmit);

// --- Mostrar los comentarios al cargar la página ---
window.onload = function() {
    populateComments();
};
