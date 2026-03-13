// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuLinks = document.querySelectorAll('.mobile-nav-links a');

function toggleMenu() {
    mobileMenu.classList.toggle('active');
    // Transform hamburger icon
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'translateY(9px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

mobileMenuBtn.addEventListener('click', toggleMenu);

// Close menu when clicking a link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Intersection Observer for Fade Up Animations
const fadeUpElements = document.querySelectorAll('.fade-up');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const fadeUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

fadeUpElements.forEach(element => {
    fadeUpObserver.observe(element);
});

// WhatsApp Integration Logic
function sendWhatsAppMessage(formData) {
    const phoneNumber = "919981020394";
    let text = `New Enquiry Received\n`;
    if (formData.name) text += `Name: ${formData.name}\n`;
    if (formData.email) text += `Email: ${formData.email}\n`;
    if (formData.phone) text += `Phone: ${formData.phone}\n`;
    if (formData.country) text += `Country: ${formData.country}\n`;
    if (formData.type) text += `Requirement: ${formData.type}\n`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
}

// Footer Form
const interestForm = document.getElementById('interestForm');
if (interestForm) {
    interestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };
        
        sendWhatsAppMessage(formData);
        
        const btn = interestForm.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.textContent = 'REDIRECTING...';
        
        setTimeout(() => {
            btn.textContent = originalText;
            interestForm.reset();
        }, 3000);
    });
}

// Popup Trigger and Form
const enquiryModal = document.getElementById('enquiryModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const popupForm = document.getElementById('popupForm');

if (enquiryModal && closeModalBtn) {
    // Show after 5 seconds
    setTimeout(() => {
        enquiryModal.classList.add('active');
    }, 5000);

    closeModalBtn.addEventListener('click', () => {
        enquiryModal.classList.remove('active');
    });

    // Close on outside click
    enquiryModal.addEventListener('click', (e) => {
        if (e.target === enquiryModal) {
            enquiryModal.classList.remove('active');
        }
    });
}

if (popupForm) {
    popupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('popupTitle').value;
        const fname = document.getElementById('popupFirstName').value;
        const lname = document.getElementById('popupLastName').value;
        
        const formData = {
            name: (title ? title + ' ' : '') + fname + ' ' + lname,
            email: document.getElementById('popupEmail').value,
            phone: document.getElementById('popupPhone').value,
            country: document.getElementById('popupCountry').value,
            type: document.getElementById('popupOthers').value
        };
        
        sendWhatsAppMessage(formData);
        
        const btn = popupForm.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.textContent = 'REDIRECTING...';
        
        setTimeout(() => {
            btn.textContent = originalText;
            enquiryModal.classList.remove('active');
            popupForm.reset();
        }, 2000);
    });
}
