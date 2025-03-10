// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add a class to body after page load for initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Add active class to navigation items when scrolling
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    });
    
    // Animation for timeline items
    const animateOnScroll = function() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const projectCards = document.querySelectorAll('.project-card');
        
        // Animate timeline items and project cards
        [...timelineItems, ...projectCards].forEach(item => {
            const position = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (position < screenPosition) {
                item.classList.add('animate');
            }
        });
        
        // Removed parallax effect for header
    };
    
    // Run on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Update copyright year
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('footer p');
    
    if (footerYear) {
        footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
    }
});

// Animated typing effect for section titles
document.addEventListener('DOMContentLoaded', function() {
    const sectionTitles = document.querySelectorAll('section > h2');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('title-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
});