// obtener los mensajes
async function getMessages() {
    try {
        const response = await fetch('https://chat.arpanetos.lol/messages');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}

// función para enviar los mensajes 
async function sendMessage(message) {
    try {
        
        const response = await fetch('https://chat.arpanetos.lol/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });
        if (!response.ok) {
            throw new Error('Network response error');
        }
        const data = await response.json();
        console.log('Message sent:', data);
        displayMessages(messageContainer);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// par crear un nuevo elemento 
function createElement(tag, styles) {
    const element = document.createElement(tag);
    Object.assign(element.style, styles);

    return element;
}

//refreencias a elementos de UI
let messageContainer, modeToggle, messageInput;

// Aplicar modo oscuro / claro
function applyMode(isDarkMode) {
    const bodyStyles = isDarkMode ? {
        backgroundColor: '#121212', // oscuro
        color: '#ffffff', // blanco
    } : {
        backgroundColor: '#ffffff', // blanco
        color: '#000000', // negro
    };
    Object.assign(document.body.style, bodyStyles);

    const messageContainerStyles = isDarkMode ? {
        color: '#00ff00', // verde
    } : {
        color: '#0000ff', // azul
    };
    Object.assign(messageContainer.style, messageContainerStyles);

    const inputAndToggleButtonStyles = isDarkMode ? {
        backgroundColor: '#333333', // oscuro medio claro
        color: '#00ff00', // verde
        borderColor: '#444444', // contraste
    } : {
        backgroundColor: '#ffffff', // blanco
        color: '#0000ff', // azul
        borderColor: '#cccccc', // default
    };
    Object.assign(modeToggle.style, inputAndToggleButtonStyles);
    Object.assign(messageInput.style, inputAndToggleButtonStyles);
}

// Inicializar el UI
function initChatUI() {
    const chatContainer = createElement('div', {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        heigh: '100vh'
    });

    document.body.appendChild(chatContainer)

    const inputContainer = createElement('div', {});
    chatContainer.appendChild(inputContainer);

    modeToggle = createElement('div', {
        cursor: 'pointer',
        padding: '10px',
        textAlign: 'center',
        marginBottom: '20px',
    });

    modeToggle.innerText = 'Dark/Light Mode';
    inputContainer.appendChild(modeToggle);

    messageContainer = createElement('div', {
        border: '1px solid #ddd',
        padding: '10px',
        marginBottom: '10px 0',
        maxHeight: '300px',
        overflowY: 'auto',
        flex: '1',
    });
    document.body.appendChild(messageContainer);

    messageInput = createElement('input', {
        padding: '10px',
        marginBottom: '10px',
        display: 'block', 
        width: 'calc(100% - 22px)',
    });
    inputContainer.appendChild(messageInput);

    
    modeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.style.backgroundColor === 'rgb(18, 18, 18)'; // Checking the current mode by body background color
        applyMode(!isDarkMode);
    });

    messageInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); 
            const message = messageInput.value.trim();
            if (message){
                if(messageInput.value.length <= 140){
                    sendMessage(messageInput.value); 
                    messageInput.value = ''; 
                }
                else{
                    alert("140 chars limit exceeded!\nNum: " + messageInput.value.length);
                }   
            }
        }
    });

    
    applyMode(false); // Empezar con el light mode
}

// Función para mostrar el preview con el cursor
function showPreview(event){
    const url = event.target.href;
    const tooltip = document.createElement('div');
    tooltip.innerText = `Preview: ${url}`; // Para el preview
    tooltip.style.position = 'absolute';
    tooltip.style.left = `${event.pageX + 15}px`;
    tooltip.style.top = `${event.pageY}px`;
    tooltip.style.backgroundColor = 'white';
    tooltip.style.border = '1px solid #ddd';
    tooltip.style.padding = '5px';
    tooltip.setAttribute('id', 'link-preview');
    document.body.appendChild(tooltip);
}
 // función para ocultar el preview
function hidePreview(){
    const tooltip = document.getElementById('link-preview');
    if (tooltip) {
        tooltip.remove();
    }
}

// Función para mostrar los mensajes (incluyendo url)
async function displayMessages(container) {
    const messages = await getMessages();
    container.innerHTML = messages.map(msg => {
        const withLinks = msg.content.replace(/(https?:\/\/[^\s]+)/g, (url)=>{
            return `<a href="${url}" target="_blank" class="preview-link">${url}</a>`;
        });
    }).join('');


    document.querySelectorAll('.preview-link').forEach(link => {
        link.addEventListener('mouseover', showPreview);
        link.addEventListener('mouseout', hidePreview);
    })
}


document.addEventListener('DOMContentLoaded', () => {
    initChatUI();
});
