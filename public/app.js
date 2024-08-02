function showContent(section) {
    // Tüm içerikleri gizle
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => {
        sec.style.display = 'none';
    });
    
    // Seçilen bölümü göster
    const activeSection = document.getElementById(`${section}-content`);
    activeSection.style.display = 'block';
}

// Sayfa açıldığında varsayılan olarak "updates" içeriğini göster
document.addEventListener('DOMContentLoaded', () => {
    showContent('updates');
});

document.getElementById('search-icon').addEventListener('click', function() {
    var searchContainer = document.getElementById('search-container');
    if (searchContainer.style.display === 'none' || searchContainer.style.display === '') {
        searchContainer.style.display = 'block';
    } else {
        searchContainer.style.display = 'none';
    }
});

document.getElementById('camera-icon').addEventListener('click', function(event) {
    event.preventDefault(); // Linkin varsayılan davranışını engeller

    const video = document.getElementById('webCam');
    const canvas = document.getElementById('canvas');
    const constraints = {
        video: true
    };

    // Kullanıcıdan kamera erişim izni iste
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            // Video akışını video elemanına aktar
            video.srcObject = stream;
            video.style.display = 'block'; // Video elemanını görünür yap
            video.play();
        })
        .catch(function(err) {
            console.log('Hata: ' + err);
        });
});

/*
const socket = io.connect('http://localhost:5500');

const messagee = document.getElementById('messagee');
const sender = document.getElementById('sender');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

submitBtn.addEventListener('click', () => {
    socket.emit('chat', {
        messagee: messagee.value,
        sender: sender.value
    });
});



socket.on('chat', data => {
    output.innerHTML += '<p><strong>' + data.sender + ':</strong> ' + data.messagee + '</p>';
});


messagee.addEventListener('keypress', () =>{
    socket.emit('typing', sender.value)
})

socket.on('typing', data => {
    feedback.innerHTML= '<p>' + data + 'typing... </p>'
})

*/

const socket = io();

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    const messageInput = document.getElementById('message-input');
    const senderInput = document.getElementById('sender');
    const chatMessages = document.getElementById('output');
    const feedback = document.getElementById('feedback');

    submitBtn.addEventListener('click', function() {
        const messageText = messageInput.value.trim();
        const senderName = senderInput.value.trim();

        if (messageText !== '' && senderName !== '') {
            socket.emit('chat', {
                sender: senderName,
                message: messageText
            });

            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.textContent = `${senderName}: ${messageText}`;
            chatMessages.appendChild(messageElement);

            messageInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            submitBtn.click();
        }
    });

    socket.on('chat', (data) => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent = `${data.sender}: ${data.message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

});
