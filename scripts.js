// scripts.js

// Typing Effect for Hero Tagline
const typingTexts = [
  "Building elegant web experiences",
  "Full-stack developer & problem solver",
  "Turning ideas into reality"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const currentText = typingTexts[textIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    typingSpeed = 500; // Pause before next text
  }

  setTimeout(typeEffect, typingSpeed);
}

// Initialize typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeEffect, 1000);
});

// Dark Mode Toggle with localStorage Persistence
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = document.querySelector('.nav').offsetHeight;
      const targetPosition = targetElement.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Validation functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateField(input, errorElement, validationFn, errorMsg) {
  const value = input.value.trim();
  
  if (!value) {
    input.classList.add('error');
    errorElement.textContent = 'This field is required';
    return false;
  }
  
  if (validationFn && !validationFn(value)) {
    input.classList.add('error');
    errorElement.textContent = errorMsg;
    return false;
  }
  
  input.classList.remove('error');
  errorElement.textContent = '';
  return true;
}

// Real-time validation
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

nameInput.addEventListener('blur', () => {
  validateField(nameInput, document.getElementById('nameError'));
});

emailInput.addEventListener('blur', () => {
  validateField(
    emailInput,
    document.getElementById('emailError'),
    validateEmail,
    'Please enter a valid email address'
  );
});

messageInput.addEventListener('blur', () => {
  validateField(messageInput, document.getElementById('messageError'));
});

// Form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Validate all fields
  const isNameValid = validateField(nameInput, document.getElementById('nameError'));
  const isEmailValid = validateField(
    emailInput,
    document.getElementById('emailError'),
    validateEmail,
    'Please enter a valid email address'
  );
  const isMessageValid = validateField(messageInput, document.getElementById('messageError'));
  
  if (isNameValid && isEmailValid && isMessageValid) {
    // Simulate form submission
    const submitButton = contactForm.querySelector('.form-submit');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Simulate API call
    setTimeout(() => {
      formMessage.className = 'form-message success';
      formMessage.textContent = 'Thank you! Your message has been sent successfully.';
      
      // Reset form
      contactForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        formMessage.className = 'form-message';
      }, 5000);
    }, 1500);
  } else {
    formMessage.className = 'form-message error';
    formMessage.textContent = 'Please fix the errors above and try again.';
    
    setTimeout(() => {
      formMessage.className = 'form-message';
    }, 5000);
  }
});

// Intersection Observer for scroll animations
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

// Observe project cards and other animated elements
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.project-card, .about__content, .contact__content');
  animatedElements.forEach(el => observer.observe(el));
});

// Navbar background on scroll
let lastScroll = 0;
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  } else {
    nav.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
