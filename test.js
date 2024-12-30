document.addEventListener('DOMContentLoaded', () => { 
    const gallery = document.querySelector('.image-grid');
    const images = [
        'img (1).jpg', 'img (2).jpg', 'img (3).jpg', 'img (4).jpg',
        'img (5).jpg', 'img (6).jpg', 'img (7).jpg', 'img (8).jpg',
        'img (9).jpg', 'img (10).jpg', 'img (11).jpg', 'img (12).jpg'
    ];

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = 'Gallery Image';
        imgElement.loading = 'lazy';
        gallery.appendChild(imgElement);
    });

    function toggleMenu() {
        const navLinks = document.getElementById('navLinks');
        const hamburger = document.querySelector('.hamburger');
        const bars = document.querySelectorAll('.bar'); 

        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) {
                    bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                } else if (index === 1) {
                    bar.style.opacity = '0';
                } else if (index === 2) {
                    bar.style.transform = 'rotate(-45deg) translate(5px, -5px)';
                }
            } else {
                bar.style.transform = 'rotate(0deg) translate(0, 0)';
                bar.style.opacity = '1';
            }
        });
        document.body.classList.toggle('no-scroll');
    }

    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', toggleMenu);

    const navLinksList = document.querySelectorAll('.nav-links li a');
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.querySelector('.hamburger');
            const bars = document.querySelectorAll('.bar');
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            bars.forEach((bar, index) => {
                bar.style.transform = 'rotate(0deg) translate(0, 0)';
                bar.style.opacity = '1';

            });
            document.body.classList.remove('no-scroll');
        });
    });

    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        fetch('/your-server-endpoint', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Message sent successfully!');
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error sending message:', error);
            alert('There was an error sending your message. Please try again later.');
        });
    });
});