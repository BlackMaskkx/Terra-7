// Variables globales
let currentChat = [];
let chatHistory = [];

// DOM Elements
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const messageForm = document.getElementById('message-form');
const chatHistoryContainer = document.getElementById('chat-history');
const newChatBtn = document.getElementById('new-chat-btn');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadChatHistory();
    setupEventListeners();
});

// Cargar historial de chats
function loadChatHistory() {
    // Simulación de historial (puedes reemplazar con localStorage)
    chatHistory = [
        { id: 1, title: "Conversación 1", messages: [] },
        { id: 2, title: "IA Avanzada", messages: [] }
    ];
    renderChatHistory();
}

// Renderizar historial
function renderChatHistory() {
    chatHistoryContainer.innerHTML = '';
    chatHistory.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item';
        chatItem.textContent = chat.title;
        chatItem.addEventListener('click', () => switchChat(chat.id));
        chatHistoryContainer.appendChild(chatItem);
    });
}

// Cambiar de chat
function switchChat(chatId) {
    const chat = chatHistory.find(c => c.id === chatId);
    if (!chat) return;
    
    currentChat = chat.messages;
    renderChat();
}

// Renderizar chat actual
function renderChat() {
    chatContainer.innerHTML = '';
    currentChat.forEach(message => {
        addMessageToChat(message.sender, message.text, false);
    });
}

// Añadir mensaje al chat
function addMessageToChat(sender, text, saveToHistory = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = `<img src="https://via.placeholder.com/30" alt="${sender}">`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (sender === 'ia' && text === '...') {
        // Mostrar animación de typing
        contentDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
    } else {
        contentDiv.innerHTML = `<p>${text}</p>`;
    }
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    
    // Scroll al final
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Guardar en historial si es necesario
    if (saveToHistory && sender !== 'ia') {
        currentChat.push({ sender, text });
    }
}

// Simular respuesta de la IA
function simulateAIResponse(userMessage) {
    // Respuestas programadas (¡aquí puedes conectar tu IA real!)
    const responses = {
        "hola": "¡Hola! ¿Cómo estás? Soy Terra-7, tu IA personalizada.",
        "qué puedes hacer": "Puedo ayudarte con información, generar ideas, o simplemente charlar. ¡Pregúntame lo que quieras!",
        "default": "Interesante... ¿Puedes desarrollar más tu pregunta?"
    };
    
    const lowerMsg = userMessage.toLowerCase();
    const response = responses[lowerMsg] || responses.default;
    
    // Simular delay de procesamiento
    setTimeout(() => {
        // Eliminar animación de typing
        const typingElements = document.querySelectorAll('.typing-indicator');
        typingElements.forEach(el => el.remove());
        
        addMessageToChat('ia', response);
    }, 1500);
}

// Event Listeners
function setupEventListeners() {
    // Enviar mensaje
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (!message) return;
        
        addMessageToChat('user', message);
        userInput.value = '';
        
        // Mostrar animación de typing
        addMessageToChat('ia', '...', false);
        
        // Simular respuesta de IA
        simulateAIResponse(message);
    });
    
    // Nuevo chat
    newChatBtn.addEventListener('click', () => {
        const newChatId = chatHistory.length + 1;
        const newChat = {
            id: newChatId,
            title: `Conversación ${newChatId}`,
            messages: []
        };
        
        chatHistory.push(newChat);
        renderChatHistory();
        switchChat(newChatId);
    });
}

// Efecto de máquina de escribir (opcional)
function typewriterEffect(element, text, speed = 30) {
    let i = 0;
    element.innerHTML = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
        }
