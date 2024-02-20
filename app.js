
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
contacts.style.width = "20%";
contacts.style.borderRight = "1px solid #ccc";
contacts.style.overflowY = "auto";

// Tener el chat del lado derecho
let chatWindow = document.createElement("div");
chatWindow.id = "chatWindow";
chatWindow.style.width = "80%";
chatWindow.style.overflowY = "auto";
chatWindow.style.position = 'relative';
chatWindow.style.height = "95%";


// para la casilla de mandar mensajes
let messageInputBox = document.createElement("div");
messageInputBox.id = "messageInputBox";
messageInputBox.style.position = "absolute";
messageInputBox.style.bottom = "0";
messageInputBox.style.width = "95%";
messageInputBox.style.display = "flex";
messageInputBox.style.padding = "10px";

let messageInput = document.createElement("input");
messageInput.id = "messageInput";
messageInput.type = "text";
messageInput.placeholder = ""
messageInput.style.flex = "1";
messageInput.style.marginRight = "10px";

let send = document.createElement("button");
send.id = "send";
send.innerText = "enviar";

send.addEventListener('click', function() {
    const message = messageInput.value;
    console.log("Message to send:", message); 
    messageInput.value = '';
});


// Agregar los divs y elementos al chat principal
messageInputBox.appendChild(messageInput);
messageInputBox.appendChild(send);
chatWindow.appendChild(messageInputBox);
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


















