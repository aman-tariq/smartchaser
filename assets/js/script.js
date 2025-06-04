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