'use strict';

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector('.header');
    const navbarPlaceholder = document.querySelector('.navbar-placeholder');
    let headerHeight = header.offsetHeight;

    window.addEventListener('resize', function () {
        headerHeight = header.offsetHeight;
        if (header.classList.contains('sticky')) {
            navbarPlaceholder.style.height = `${headerHeight}px`;
        }
    });

    window.addEventListener('scroll', function () {
        const currentScrollY = window.scrollY;

        if (currentScrollY > headerHeight) {
            header.classList.add('sticky');
            navbarPlaceholder.classList.add('sticky');
            navbarPlaceholder.style.height = `${headerHeight}px`;
        } else {
            header.classList.remove('sticky');
            navbarPlaceholder.classList.remove('sticky');
            navbarPlaceholder.style.height = '0';
        }
    });

    const dropdownToggles = document.querySelectorAll('.nav-item.dropdown .nav-link');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                const parent = this.parentElement;
                const isActive = parent.classList.contains('active');
                document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                    item.classList.remove('active');
                });
                if (!isActive) {
                    parent.classList.add('active');
                }
            }
        });
    });

    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    });
});

function startCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      let current = 0;
      const increment = target / 100;
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current).toLocaleString();
          if (current >= target) {
            counter.textContent = (target > 10000 ? (target / 1000000) + 'M+' : target + '+');
          } else {
            setTimeout(updateCounter, 20);
          }
        }
      };
      updateCounter();
    });
  }
  window.addEventListener('load', startCounters);

// ----read more----

  function toggleMore(id) {
    const content = document.getElementById(id);
    const button = content.nextElementSibling;
    if (content.style.display === 'none') {
        content.style.display = 'block';
        button.innerHTML = 'Read Less <span class="arrow">«</span>';
    } else {
        content.style.display = 'none';
        button.innerHTML = 'Read More <span class="arrow">»</span>';
    }
}

// ----contact---
document.addEventListener('DOMContentLoaded', () => {
    const contactSection = document.querySelector('#contact');
    const contactLeft = document.querySelector('.contact-left');
    const contactRight = document.querySelector('.contact-right');
    const infoBlocks = document.querySelectorAll('.info-block');
    const formGroups = document.querySelectorAll('.form-group');
    const submitBtn = document.querySelector('.btn');

    let lastScrollY = window.scrollY;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const currentScrollY = window.scrollY;
            const isScrollingUp = currentScrollY < lastScrollY;

            if (entry.isIntersecting) {
                // Section is in view, trigger slide-in animations
                contactLeft.classList.add('slide-in-left');
                contactLeft.classList.remove('fade-out');
                contactRight.classList.add('slide-in-right');
                contactRight.classList.remove('fade-out');
                infoBlocks.forEach(block => block.classList.add('animate'));
                formGroups.forEach(group => group.classList.add('animate'));
                submitBtn.classList.add('animate');
            } else if (isScrollingUp && !entry.isIntersecting) {
                // Scrolling up and section is out of view, trigger fade-out
                contactLeft.classList.add('fade-out');
                contactLeft.classList.remove('slide-in-left');
                contactRight.classList.add('fade-out');
                contactRight.classList.remove('slide-in-right');
                infoBlocks.forEach(block => block.classList.remove('animate'));
                formGroups.forEach(group => group.classList.remove('animate'));
                submitBtn.classList.remove('animate');
            }

            lastScrollY = currentScrollY;
        });
    }, {
        threshold: 0.2 // Trigger when 20% of section is visible
    });

    observer.observe(contactSection);
});
