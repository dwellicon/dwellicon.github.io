       document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        let lastScroll = 0;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });

        const stats = document.querySelectorAll('.stat-number');
        let statsAnimated = false;

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    stats.forEach(stat => {
                        const target = stat.textContent;
                        stat.textContent = '0';
                        
                        setTimeout(() => {
                            stat.textContent = target;
                        }, 300);
                    });
                    statsAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        if (stats.length > 0) {
            statsObserver.observe(stats[0].parentElement.parentElement);
        }

        document.querySelectorAll('.pricing-card, .team-member, .stat-card, .comparison-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });
            card.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
            });
        });

        function toggleMenu() {
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.getElementById('mobileMenu');
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        }

        document.getElementById('mobileMenu').addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                toggleMenu();
            }
        });

        document.querySelectorAll('.cta-button, .plan-button').forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.animation = 'wiggle 0.5s ease';
            });
            button.addEventListener('mouseleave', function() {
                this.style.animation = 'none';
            });
        });

        const hero = document.querySelector('.hero');
        let mouseX = 0, mouseY = 0;
        
        hero.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
            
            const heroImage = hero.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = `perspective(1000px) rotateY(${mouseX * 10 - 5}deg) rotateX(${mouseY * -10 + 5}deg)`;
            }
        });

        hero.addEventListener('mouseleave', () => {
            const heroImage = hero.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
            }
        });
