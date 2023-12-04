let usuarios = [];
let intentosFallidos = 0;
const intentosMaximos = 3;  // Número máximo de intentos fallidos permitidos
const tiempoBloqueo = 3000;  // Tiempo de bloqueo en milisegundos (3 segundos en este ejemplo)

function iniciarSesion() {
    if (intentosFallidos >= intentosMaximos) {
        alert("Demasiados intentos fallidos. Por favor, espera unos minutos antes de intentarlo de nuevo.");
        return;
    }

    const email = document.getElementById("loginEmail").value;
    const contraseña = document.getElementById("loginPassword").value;

    if (contraseña.length < 8 || contraseña.length > 20) {
        alert("La contraseña debe tener entre 8 y 20 caracteres.");
        return;
    }

    const usuarioEncontrado = usuarios.find(user => user.email === email && user.contraseña === contraseña);

    if (usuarioEncontrado) {
        location.href="bienvenidaNuevoUsuario.html"
        alert(`Inicio de sesión exitoso. Bienvenido, ${email}!`);
        // Restablecer intentos fallidos después de un inicio de sesión exitoso
        intentosFallidos = 0;
    } else {
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        intentosFallidos++;

        if (intentosFallidos >= intentosMaximos) {
            // Bloquear el inicio de sesión durante un tiempo determinado
            setTimeout(() => {
                intentosFallidos = 0;
            }, tiempoBloqueo);
        }
    }
}

function registrarUsuario() {
    const email = document.getElementById("registerEmail").value;
    const contraseña = document.getElementById("registerPassword").value;
    const confirmarContraseña = document.getElementById("confirmPassword").value;

    if (contraseña.length < 8 || contraseña.length > 20) {
        alert("La contraseña debe tener entre 8 y 20 caracteres.");
        return;
    }

    if (contraseña !== confirmarContraseña) {
        alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        return;
    }

    const usuarioExistente = usuarios.find(user => user.email === email);

    if (usuarioExistente) {
        alert("Ya existe un usuario con este correo electrónico. Por favor, elija otro.");
    } else {
        usuarios.push({ email, contraseña });
        alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
        limpiarCamposRegistro();
    }
}

function limpiarCamposRegistro() {
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("confirmPassword").value = "";
}

