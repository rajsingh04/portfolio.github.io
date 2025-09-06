// Complete Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active section highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Contact form functionality
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const buttonText = document.getElementById('button-text');
    const messageContainer = document.getElementById('message-container');
    const messageText = document.getElementById('message-text');

    function showMessage(text, isSuccess = false) {
        messageText.textContent = text;
        messageContainer.className = `message-container ${isSuccess ? 'success' : 'error'}`;
        messageContainer.classList.remove('hidden');
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageContainer.classList.add('hidden');
        }, 5000);
    }

    function setLoading(loading) {
        if (loading) {
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            buttonText.textContent = 'Sending...';
        } else {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            buttonText.textContent = 'Submit';
        }
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const email = formData.get('email');
            const name = formData.get('name');
            const message = formData.get('message');
            
            if (!email || !name || !message) {
                showMessage('Please fill in all fields.', false);
                return;
            }
            
            if (!validateEmail(email)) {
                showMessage('Please enter a valid email address.', false);
                return;
            }
            
            setLoading(true);
            
            // Use fetch to submit to Formspree
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    setLoading(false);
                    showMessage('Thank you for your message! I will get back to you soon.', true);
                    form.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwnProperty.call(data, 'errors')) {
                            setLoading(false);
                            showMessage(data["errors"].map(error => error["message"]).join(", "), false);
                        } else {
                            setLoading(false);
                            showMessage('Oops! There was a problem submitting your form', false);
                        }
                    })
                }
            }).catch(error => {
                setLoading(false);
                showMessage('Oops! There was a problem submitting your form. Please try again or contact me directly at rajsingh18904@gmail.com', false);
            });
        });
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add scroll animations
    function addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

        // Observe skill items
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
            observer.observe(item);
        });

        // Observe project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
            observer.observe(card);
        });
    }

    // Initialize scroll animations
    addScrollAnimations();

    // Header background opacity on scroll
    const header = document.querySelector('.header');
    const navBackground = document.querySelector('.nav-background');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Add scrolled class for styling
        if (scrolled > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });

    // Initial call to set active nav link
    updateActiveNavLink();
});

// Add some interactive features
window.addEventListener('load', function() {
    // Add typing effect to the intro heading
    const heading = document.querySelector('.intro-heading');
    if (heading) {
        const text = heading.innerHTML;
        heading.innerHTML = '';
        heading.style.borderRight = '2px solid #3b82f6';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                if (text.charAt(i) === '<') {
                    // Handle HTML tags
                    let tag = '';
                    while (text.charAt(i) !== '>' && i < text.length) {
                        tag += text.charAt(i);
                        i++;
                    }
                    tag += text.charAt(i); // Add closing >
                    heading.innerHTML += tag;
                } else {
                    heading.innerHTML += text.charAt(i);
                }
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heading.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
});
