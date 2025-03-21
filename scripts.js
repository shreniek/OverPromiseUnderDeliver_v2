// Function to show popups
function showPopup(popupType) {
    // For resume download
    if (popupType === 'resume' || popupType === 'cv') {
        document.getElementById('cv-modal').style.display = 'block';
    } else {
        // Show other modals
        const modalId = popupType + '-modal';
        document.getElementById(modalId).style.display = 'block';
    }
}

// Function to close popups
function closePopup(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Function to redirect to projects
function goToProject(projectUrl) {
    window.open(projectUrl, '_blank');
}

// Initialize page elements and animations
document.addEventListener('DOMContentLoaded', function() {
    // Update visitor count randomly
    setInterval(function() {
        const visitorCount = document.getElementById('visitor-count');
        if (visitorCount) {
            visitorCount.innerText = Math.floor(Math.random() * 10) + 20;
        }
    }, 3000);

    // Countdown timer
    let seconds = 300; // 5 minutes
    const countdownTimer = setInterval(function() {
        const countdown = document.getElementById('countdown');
        if (countdown) {
            seconds--;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            countdown.innerText = minutes.toString().padStart(2, '0') + ':' + remainingSeconds.toString().padStart(2, '0');
            
            if (seconds <= 0) {
                clearInterval(countdownTimer);
                countdown.innerText = "EXPIRED!";
            }
        }
    }, 1000);

    // Show testimonial bubbles randomly
    setTimeout(function() {
        const testimonial = document.querySelector('.testimonial-bubble');
        if (testimonial) {
            testimonial.style.display = 'block';
            
            setTimeout(function() {
                testimonial.style.display = 'none';
            }, 10000);
        }
    }, 5000);

    // Cookie consent close button
    const closeCookieBtn = document.getElementById('close-cookie-btn');
    if (closeCookieBtn) {
        closeCookieBtn.addEventListener('click', function() {
            document.getElementById('cookie-consent').style.display = 'none';
        });
    }

    // Notification bell click functionality
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            const liveChat = document.getElementById('live-chat');
            if (liveChat) {
                liveChat.style.display = liveChat.style.display === 'none' || !liveChat.style.display ? 'block' : 'none';
            }
        });
    }

    // Close chat functionality
    const closeChat = document.querySelector('.close-chat');
    if (closeChat) {
        closeChat.addEventListener('click', function() {
            document.getElementById('live-chat').style.display = 'none';
        });
    }

    // AI Assistant functionality
    const aiAssistant = document.querySelector('.ai-assistant');
    if (aiAssistant) {
        aiAssistant.addEventListener('click', function() {
            const aiChat = document.querySelector('.ai-chat');
            if (aiChat) {
                aiChat.style.display = aiChat.style.display === 'none' || !aiChat.style.display ? 'block' : 'none';
                
                // Show AI typing animation
                if (aiChat.style.display === 'block') {
                    const aiTyping = document.querySelector('.ai-typing');
                    if (aiTyping) {
                        aiTyping.style.display = 'block';
                        
                        // Simulate AI typing and response
                        setTimeout(function() {
                            aiTyping.style.display = 'none';
                            const aiMessages = document.querySelector('.ai-messages');
                            if (aiMessages) {
                                const newMessage = document.createElement('div');
                                newMessage.innerHTML = '<b>AI Advisor:</b> Based on your profile, I recommend hiring Shreneek immediately! Shall I prepare a contract?';
                                newMessage.style.marginBottom = '10px';
                                aiMessages.appendChild(newMessage);
                                aiMessages.scrollTop = aiMessages.scrollHeight;
                            }
                        }, 2000);
                    }
                }
            }
        });
    }

    // Close AI chat functionality
    const closeAiChat = document.querySelector('.close-ai-chat');
    if (closeAiChat) {
        closeAiChat.addEventListener('click', function() {
            document.querySelector('.ai-chat').style.display = 'none';
        });
    }

    // Add cursor trail effect
    document.addEventListener('mousemove', function(e) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        document.body.appendChild(trail);
        
        setTimeout(function() {
            trail.remove();
        }, 1000);
    });

    // Setup contact form functionality with SMTP.js
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value || 'Not provided';
            const message = document.getElementById('message').value;
            const consent = document.getElementById('consent').checked ? 'Yes' : 'No';
            
            // Prepare email body
            const emailBody = `
                Name: ${name}
                Email: ${email}
                Company: ${company}
                Message: ${message}
                Marketing Consent: ${consent}
            `;
            
            // Send email using SMTP.js
            // Replace these values with your actual SMTP credentials
            Email.send({
                SecureToken: "YOUR_SECURE_TOKEN", // Get this from SMTP.js
                // Alternatively, use these individual settings:
                // Host: "smtp.example.com",
                // Username: "your_username",
                // Password: "your_password",
                // Port: 587,
                To: 'shreneek.de@gmail.com', // Your email address
                From: 'website-contact@yourdomain.com', // Your sender email
                Subject: `Website Contact from ${name}`,
                Body: emailBody
            }).then(function(message) {
                console.log("Email sent successfully:", message);
                
                // Show success message
                contactForm.style.display = 'none';
                document.getElementById('form-success').style.display = 'block';
                
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Reset form
                contactForm.reset();
            }).catch(function(error) {
                console.error("Failed to send email:", error);
                
                // Show error message
                document.getElementById('form-error').style.display = 'block';
                
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }

    // Add functionality for the CV form submission
    const cvForm = document.querySelector('#cv-modal form');
    if (cvForm) {
        cvForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = cvForm.querySelector('input[name="name"]').value;
            const email = cvForm.querySelector('input[name="email"]').value;
            const company = cvForm.querySelector('input[name="company"]').value || 'Not provided';
            const phone = cvForm.querySelector('input[name="phone"]').value || 'Not provided';
            const agreement = cvForm.querySelector('input[name="agreement"]').checked ? 'Yes' : 'No';
            
            // Prepare email body
            const emailBody = `
                CV Request Details:
                ------------------
                Name: ${name}
                Email: ${email}
                Company: ${company}
                Phone: ${phone}
                Marketing Agreement: ${agreement}
            `;
            
            // Send email notification about CV request
            Email.send({
                SecureToken: "YOUR_SECURE_TOKEN",
                To: 'shreneek.de@gmail.com',
                From: 'website-cv@yourdomain.com',
                Subject: `CV Request from ${name}`,
                Body: emailBody
            }).then(function(message) {
                console.log("CV request email sent successfully:", message);
                
                // Simulate CV download
                const link = document.createElement('a');
                link.href = 'path/to/Shreneek_Upadhye_Resume.pdf'; // Replace with actual path
                link.download = 'Shreneek_Upadhye_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Close the modal
                closePopup('cv-modal');
                
                // Reset form
                cvForm.reset();
            }).catch(function(error) {
                console.error("Failed to send CV request email:", error);
                alert('Sorry, there was an error processing your request. Please try again later.');
            });
        });
    }

    // Setup for contact modal form
    const contactModalForm = document.querySelector('#contact-modal form');
    if (contactModalForm) {
        contactModalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = contactModalForm.querySelector('input[name="name"]').value;
            const email = contactModalForm.querySelector('input[name="email"]').value;
            const message = contactModalForm.querySelector('textarea[name="message"]').value;
            
            // Prepare email body
            const emailBody = `
                Contact Modal Form Submission:
                -----------------------------
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `;
            
            // Send email
            Email.send({
                SecureToken: "YOUR_SECURE_TOKEN",
                To: 'shreneek.de@gmail.com',
                From: 'website-modal@yourdomain.com',
                Subject: `Website Modal Contact from ${name}`,
                Body: emailBody
            }).then(function(message) {
                console.log("Modal contact email sent successfully:", message);
                
                // Show success message
                alert('Message sent successfully! I will contact you soon!');
                
                // Close the modal
                closePopup('contact-modal');
                
                // Reset form
                contactModalForm.reset();
            }).catch(function(error) {
                console.error("Failed to send modal contact email:", error);
                alert('Sorry, there was an error sending your message. Please try again later.');
            });
        });
    }
});
