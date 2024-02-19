
/**
 * Definir bien el estilo y apariencia del chat
 * 
 */

const themes = {
    light: {
        backgroundColor: 'white',
        color: 'black'
    },
    dark: {
        backgroundColor: 'black',
        color: 'white'
    }
};

// Crear las bases del chat
let chat = document.createElement("div");
chat.id = "chat";
chat.style.display = "flex";
chat.style.height = "100vh";



// Tener los contactos del lado izquierdo
let contacts = document.createElement("div");
contacts.id= "contacts";
contacts.style.width = "30%";
contacts.style.borderRight = "1px solid #ccc";
contacts.style.overflowY = "auto";

// Tener el chat del lado derecho
let chatWindow = document.createElement("div");
chatWindow.id = "chatWindow";
chatWindow.style.width = "70%";
chatWindow.style.overflowY = "auto";

// Agregar los divs al chat principal
chat.appendChild(contacts)
chat.appendChild(chatWindow)
document.body.append(chat)



function applyTheme(theme){
    const properties =  themes[theme];
    Object.keys(properties).forEach(property => {
        document.body.style[property] = properties[property];
        // aplicar otros estilos
    });
}

let currentTheme = 'light';
function toggleTheme(){
    currentTheme = (currentTheme === 'light')? 'dark': 'light';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
}

// incluir el botón para el cambio de color
let modeToggle = document.createElement("button");
modeToggle.innerText = "Dark/Light";
modeToggle.addEventListener('click', toggleTheme);
modeToggle.style.position = "fixed";
modeToggle.style.top = "20px";
modeToggle.style.left = "20px";
modeToggle.style.zIndex = "1000";
document.body.appendChild(modeToggle);




function loadSavedTheme(){
    const savedTheme = localStorage.getItem('tehme')
    if (savedTheme){
        currentTheme = savedTheme;
        applyTheme(savedTheme);
    }
}












// ajustarse dependiendo de la pantalla 
function adjustVisibility(){
    if (window.innerWidth <= 768){
        contacts.style.width = "100%";
        chatWindow.style.width = "100%";
        chatWindow.style.display = "none";
    }
    else{
        contacts.style.width = "30%";
        chatWindow.style.width = "70%";
        chatWindow.style.display = "block";
    }
}

adjustVisibility();
window.addEventListener('resize', adjustVisibility);

// para pasar entre una pantalla chiquita y una grande
function toggleView(){
    if (window.innerWidth <= 768){
        if (contacts.style.display === "none"){
            contacts.style.display = "block";
            chatWindow.style.display = "none";
        }
        else{
            contacts.style.display = "none";
            chatWindow.style.display = "block";
        }
    }
}






