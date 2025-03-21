// Wait for the document to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Set up the contact form submission handler
    setupForm();
    
    // Set up all the download buttons
    setupDownloadButtons();
    
    // Set up cookie consent
    setupCookieConsent();
    
    // Set up live chat
    setupLiveChat();
    
    // Set up notifications (bell)
    setupNotifications();
    
    // Set up the countdown timer
    startCountdown();
    
    // Update visitor count randomly
    updateVisitorCount();
});

// Handle the contact form submission
function setupForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton ? submitButton.textContent : 'Send';
        if (submitButton) {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
        }
        
        // Get form values
        const name = document.getElementById('name').value || '';
        const email = document.getElementById('email').value || '';
        const company = document.getElementById('company').value || 'Not provided';
        const message = document.getElementById('message').value || '';
        const consent = (document.getElementById('consent') && document.getElementById('consent').checked) ? 'Yes' : 'No';
        
        // Prepare email body
        const emailBody = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Marketing Consent:</strong> ${consent}</p>
        `;
        
        // Send email using SMTP.js
        Email.send({
            SecureToken: "973862d2-db09-4bc5-a9c6-d1bd3b14af6c",
            To: 'shreneek.de@gmail.com',
            From: 'shreneek.de@gmail.com',
            Subject: `Website Contact from ${name}`,
            Body: emailBody
        }).then(function(response) {
            console.log("Email sent successfully:", response);
            
            // Show success message
            const formSuccess = document.getElementById('form-success');
            if (formSuccess) {
                formSuccess.style.display = 'block';
                contactForm.style.display = 'none';
            } else {
                alert("Thank you for your interest! Shreneek will contact you ASAP with MIND-BLOWING solutions!");
            }
            
            // Reset button
            if (submitButton) {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
            
            // Reset form
            contactForm.reset();
        }).catch(function(error) {
            console.error("Failed to send email:", error);
            
            // Show error message
            const formError = document.getElementById('form-error');
            if (formError) {
                formError.style.display = 'block';
            } else {
                alert("Sorry, there was an error sending your message. Please try again later.");
            }
            
            // Reset button
            if (submitButton) {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    });
}

// Set up all download buttons (including CV and verification)
function setupDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            console.log("Download button clicked"); // Debug
            
            // Create a temporary link to download the resume/PDF
            const link = document.createElement('a');
            link.href = 'assets/Shreneek_Upadhye_Resume.pdf'; // Update with your actual file path
            link.download = 'Shreneek_Upadhye_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
    
    // Special button for CTA (scroll to contact form)
    const ctaButton = document.querySelector('.giant-cta-btn');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const contactSection = document.getElementById('contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Handle cookie consent banner
function setupCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    if (!cookieConsent) return;
    
    const acceptButton = cookieConsent.querySelector('.accept-btn');
    const declineButton = cookieConsent.querySelector('.decline-btn');
    
    if (acceptButton) {
        acceptButton.addEventListener('click', function() {
            console.log("Accept button clicked");
            cookieConsent.style.display = 'none';
            localStorage.setItem('cookieConsent', 'accepted');
        });
    }
    
    if (declineButton) {
        declineButton.addEventListener('click', function() {
            console.log("Decline button clicked");
            cookieConsent.style.display = 'none';
            localStorage.setItem('cookieConsent', 'declined');
        });
    }
    
    // Check if user already made a choice
    const consentChoice = localStorage.getItem('cookieConsent');
    if (consentChoice) {
        cookieConsent.style.display = 'none';
    }
}

// Live chat functionality
function setupLiveChat() {
    const liveChat = document.getElementById('live-chat');
    if (!liveChat) return;
    
    // Close chat button
    const closeChatButton = liveChat.querySelector('.close-chat');
    if (closeChatButton) {
        closeChatButton.addEventListener('click', function() {
            liveChat.style.display = 'none';
        });
    }
    
    // Chat elements
    const chatMessages = liveChat.querySelector('.chat-messages');
    const chatInput = liveChat.querySelector('.chat-input input');
    const chatSendButton = liveChat.querySelector('.chat-input button');
    
    // Send message
    function sendMessage() {
        if (!chatInput || !chatInput.value.trim()) return;
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.innerHTML = `<b>You:</b> ${chatInput.value}`;
        chatMessages.appendChild(userMessage);
        
        // Auto-reply (simulated AI response)
        setTimeout(function() {
            const aiMessage = document.createElement('div');
            aiMessage.innerHTML = `<b>AI Support:</b> Thank you for your message! Shreneek will get back to you shortly with AMAZING AI solutions!`;
            chatMessages.appendChild(aiMessage);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        // Clear input
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Send message on button click
    if (chatSendButton) {
        chatSendButton.addEventListener('click', sendMessage);
    }
    
    // Send message on Enter
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Set up notification bell
function setupNotifications() {
    const notificationBell = document.querySelector('.notification-bell');
    if (!notificationBell) return;
    
    notificationBell.addEventListener('click', function() {
        alert("You have 8 new job opportunities waiting for you!");
    });
}

// Countdown timer
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    let minutes = 5;
    let seconds = 0;
    
    const countdownInterval = setInterval(function() {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(countdownInterval);
                countdownElement.innerHTML = "EXPIRED";
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        countdownElement.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
    }, 1000);
}

// Update visitor count randomly
function updateVisitorCount() {
    const visitorCountElement = document.getElementById('visitor-count');
    if (!visitorCountElement) return;
    
    let count = parseInt(visitorCountElement.textContent) || 27;
    
    setInterval(function() {
        // Randomly increase or decrease by 0-3
        const change = Math.floor(Math.random() * 4);
        const direction = Math.random() > 0.7 ? -1 : 1; // More likely to increase
        
        count += (change * direction);
        
        // Ensure count stays reasonable
        if (count < 15) count = 15;
        if (count > 50) count = 50;
        
        visitorCountElement.textContent = count;
    }, 5000);
}
