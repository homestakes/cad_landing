// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-wrapper')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100; // Increased offset to account for fixed navbar height
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.borderBottom = '1px solid #e0e0e0';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.borderBottom = '1px solid #f0f0f0';
    }
});

// Form Submission Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`Project Inquiry from ${data.name}`);
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Phone: ${data.phone || 'Not provided'}\n` +
            `Service Interest: ${data.service}\n\n` +
            `Message:\n${data.message}`
        );
        
        // Open email client
        window.location.href = `mailto:pete@caddy3d.com?subject=${subject}&body=${body}`;
        
        // Show success message (optional)
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Opening email client...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            this.reset();
        }, 3000);
    });
}

// Enhanced scroll animations with stagger effect
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -100px 0px'
};

// Create observer for reveal animations
const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay based on element position
            setTimeout(() => {
                entry.target.classList.add('in-view');
            }, index * 50);
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    // Cards and sections to animate
    const animateElements = document.querySelectorAll(
        '.advantage-card, .service-card, .service-card-mini, .process-step, .pricing-card'
    );
    
    animateElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
    });
    
    const titleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });
    
    // Removed parallax effects - keeping things simple
});

// Add hover effect to cards - removed as it's handled by CSS

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = `&copy; ${currentYear} Caddy Designs Co. All rights reserved.`;
}

// Loading animation for images when they're added
document.querySelectorAll('img').forEach(img => {
    // Only apply fade-in if image hasn't loaded yet
    if (!img.complete) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    } else {
        // Image already loaded, ensure it's visible
        img.style.opacity = '1';
    }
});

// Removed parallax effect - was causing content to be hidden when scrolling

// Add active state to navigation based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav state
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active:not(.cta-button) {
        color: var(--accent-sage);
        position: relative;
    }
    .nav-menu a.active:not(.cta-button)::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--accent-sage);
    }
`;
document.head.appendChild(style);