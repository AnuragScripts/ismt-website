// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('ISMT College Website Loaded!');
    
    // Initialize variables and DOM elements
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const programCategories = document.querySelectorAll('.program-category');
    
    // Handle header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTopBtn.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            
            // Toggle menu icon
            const icon = menuToggle.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('#navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        });
    });
    
    // Program tabs functionality
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                
                // Remove active class from all buttons and add to clicked
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Hide all program categories
                programCategories.forEach(category => category.classList.remove('active'));
                
                // Show the selected category
                document.getElementById(target).classList.add('active');
            });
        });
    }
    
    // Faculty slider functionality (simple version)
    const facultySlider = document.querySelector('.faculty-slider');
    const prevBtn = document.querySelector('.faculty .prev-btn');
    const nextBtn = document.querySelector('.faculty .next-btn');
    
    if (facultySlider && prevBtn && nextBtn) {
        let slidePosition = 0;
        const facultyCards = document.querySelectorAll('.faculty-card');
        const cardWidth = facultyCards[0].offsetWidth;
        const cardMargin = 30; // gap between cards
        const totalWidth = cardWidth + cardMargin;
        
        // Update faculty slider position
        function updateSliderPosition() {
            facultySlider.style.transform = `translateX(-${slidePosition * totalWidth}px)`;
        }
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            if (slidePosition < facultyCards.length - 1) {
                slidePosition++;
                updateSliderPosition();
            }
        });
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            if (slidePosition > 0) {
                slidePosition--;
                updateSliderPosition();
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you'd normally handle form submission to a server
            // For now, we'll just show a success message
            
            const formFields = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            // Simple validation
            formFields.forEach(field => {
                if (field.required && !field.value) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
    
    // Application form submission
    const applicationForm = document.querySelector('.application-form');
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const formFields = applicationForm.querySelectorAll('input, select');
            let isValid = true;
            
            formFields.forEach(field => {
                if (field.required && !field.value) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                alert('Thank you for your interest! Our admissions team will contact you with more information.');
                applicationForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                alert('Please enter your email address.');
            }
        });
    }
    
    // Active menu item based on scroll position
    function setActiveMenuItemOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                document.querySelector(`nav ul li a[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`nav ul li a[href="#${sectionId}"]`).classList.remove('active');
            }
        });
    }
    
    // Update active menu item on scroll
    window.addEventListener('scroll', setActiveMenuItemOnScroll);
});