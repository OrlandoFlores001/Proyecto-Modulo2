//Cerrar sesion

document.getElementById("logout").addEventListener("click", function(){
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "login.html";
})