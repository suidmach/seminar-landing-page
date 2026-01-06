// Configuration - Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwzfj9Dd5hiK_BCaxXEDiXIHj6jWbtBwegVwHzozEccNYHF5EtZDKGWPM1TUt1lhNo1/exec';

// Get form elements
const form = document.getElementById('registrationForm');
const submitButton = document.getElementById('submitButton');
const buttonText = document.getElementById('buttonText');
const buttonLoader = document.getElementById('buttonLoader');
const formMessage = document.getElementById('formMessage');
const confirmationMessage = document.getElementById('confirmationMessage');

// Handle form submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Disable submit button and show loader
    submitButton.disabled = true;
    buttonText.style.display = 'none';
    buttonLoader.style.display = 'inline-block';
    formMessage.style.display = 'none';
    
    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        seminarDate: document.getElementById('seminarDate').value,
        timeline: document.getElementById('timeline').value,
        timestamp: new Date().toISOString()
    };
    
    try {
        // Send data to Google Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Note: With no-cors mode, we can't read the response
        // So we assume success if no error is thrown
        
        // Hide form and show confirmation
        form.style.display = 'none';
        confirmationMessage.style.display = 'block';
        
        // Scroll to confirmation message
        confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Optional: Send event to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'seminar_registration',
                'event_label': formData.seminarDate
            });
        }
        
    } catch (error) {
        console.error('Error:', error);
        
        // Re-enable button
        submitButton.disabled = false;
        buttonText.style.display = 'inline';
        buttonLoader.style.display = 'none';
        
        // Show error message
        formMessage.textContent = 'Something went wrong. Please try again or email hello@mathewgibeault.ca';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optional: Form validation helpers
document.getElementById('phone').addEventListener('input', function(e) {
    // Remove non-numeric characters
    let value = e.target.value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (value.length > 0) {
        if (value.length <= 3) {
            value = value;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    
    e.target.value = value;
});

// Email validation
document.getElementById('email').addEventListener('blur', function(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        e.target.style.borderColor = '#ef4444';
    } else {
        e.target.style.borderColor = '#e5e7eb';
    }
});
