// Importar Firebase y la autenticación
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyClwaZb-5L98-LcvshbeIZl9ZzO8JikYxY",
  authDomain: "bytedrop-ptc.firebaseapp.com",
  projectId: "bytedrop-ptc",
  storageBucket: "bytedrop-ptc.appspot.com", // ⚠️ Corregido el storageBucket
  messagingSenderId: "971396241036",
  appId: "1:971396241036:web:85d4a53f45d414f88fcda9",
  measurementId: "G-CKP24PTVES"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Proveedores de autenticación
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// 🟢 Función para registrar usuarios
const registerUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Usuario registrado:", userCredential.user);
      alert("Registro exitoso 🎉");
      window.location.href = "principal.html"; // Redirigir a la página principal
    })
    .catch((error) => {
      console.error("Error al registrar:", error.message);
      alert("Error: " + error.message);
    });
};

// 🔵 Función para iniciar sesión con email y contraseña
const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Usuario autenticado:", userCredential.user);
      alert("Inicio de sesión exitoso 🎉");
      window.location.href = "principal.html"; // Redirigir a la página principal
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error.message);
      alert("Error: " + error.message);
    });
};

// 🔴 Función para iniciar sesión con Google
const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      console.log("Usuario con Google:", result.user);
      alert("Inicio de sesión con Google exitoso 🎉");
      window.location.href = "principal.html";
    })
    .catch((error) => console.error("Error en Google Auth:", error));
};

// 🟠 Función para iniciar sesión con GitHub
const signInWithGitHub = () => {
  signInWithPopup(auth, githubProvider)
    .then((result) => {
      console.log("Usuario con GitHub:", result.user);
      alert("Inicio de sesión con GitHub exitoso 🎉");
      window.location.href = "principal.html";
    })
    .catch((error) => console.error("Error en GitHub Auth:", error));
};

// 🔵 Función para cerrar sesión
const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log("Sesión cerrada");
      alert("Sesión cerrada correctamente");
      window.location.href = "index.html"; // Redirigir a la página de inicio
    })
    .catch((error) => console.error("Error al cerrar sesión:", error));
};

// 🟢 Escuchar el formulario de **inicio de sesión**
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("formulario1");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      loginUser(email, password);
    });
  }

  // 🟠 Escuchar el formulario de **registro**
  const registerForm = document.getElementById("formularioRegistro");
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("reg-email").value;
      const password = document.getElementById("reg-password").value;
      registerUser(email, password);
    });
  }

  // 🟢 Escuchar botones de Google y GitHub
  const googleBtn = document.getElementById("googleLogin");
  if (googleBtn) googleBtn.addEventListener("click", signInWithGoogle);

  const githubBtn = document.getElementById("githubLogin");
  if (githubBtn) githubBtn.addEventListener("click", signInWithGitHub);

  // 🔴 Escuchar botón de **cerrar sesión**
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) logoutBtn.addEventListener("click", logOut);
});

// Exportar funciones para usarlas en otros archivos
export { auth, loginUser, registerUser, signInWithGoogle, signInWithGitHub, logOut };
