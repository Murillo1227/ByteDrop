// Importar Firebase y la configuración
import { auth } from "./firebase-config.js";  
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, 
    onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"; 

// Proveedores de autenticación
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Iniciar sesión con Google
function signInWithGoogle() {
    signInWithPopup(auth, googleProvider)
        .then(result => {
            const user = result.user;
            document.getElementById("user-info").innerHTML = `Bienvenido, ${user.displayName}`;
        })
        .catch(error => console.error("Error en Google Auth:", error.message));
}

// Iniciar sesión con GitHub
function signInWithGitHub() {
    signInWithPopup(auth, githubProvider)
        .then(result => {
            const user = result.user;
            document.getElementById("user-info").innerHTML = `Bienvenido, ${user.displayName}`;
        })
        .catch(error => console.error("Error en GitHub Auth:", error.message));
}

// Registrar usuario con correo y contraseña
function registerUser(email, password) {
    registerUser("test@example.com", "securePass123"); 
    loginUser("test@example.com", "securePass123");  

    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log("Usuario registrado:", userCredential.user);
        })
        .catch(error => {
            console.error("Error al registrar usuario:", error.message);
        });
}

// Iniciar sesión con correo y contraseña
function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log("Inicio de sesión exitoso:", userCredential.user);
        })
        .catch(error => {
            console.error("Error al iniciar sesión:", error.message);
        });
}

// Cerrar sesión
function logOut() {
    signOut(auth)
        .then(() => {
            document.getElementById("user-info").innerHTML = "Sesión cerrada";
        })
        .catch(error => console.error("Error al cerrar sesión:", error.message));
}

// Detectar usuario autenticado
onAuthStateChanged(auth, user => {
    if (user) {
        document.getElementById("user-info").innerHTML = `Bienvenido, ${user.displayName || user.email}`;
        console.log("Usuario autenticado:", user);

        setTimeout(() => {
            window.location.href = "index.html"; // Redirige a la página principal después de 10 segundos
        }, 10000);
    } else {
        document.getElementById("user-info").innerHTML = "No hay usuario autenticado";
    }
});

// Exportar funciones de autenticación
export { signInWithGoogle, signInWithGitHub, logOut, registerUser, loginUser };
