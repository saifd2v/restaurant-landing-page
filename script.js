lucide.createIcons();

const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
} else {
    html.classList.remove('dark');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
        localStorage.theme = 'dark';
    } else {
        localStorage.theme = 'light';
    }
});

const menuBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-md');
        navbar.classList.replace('h-20', 'h-16');
    } else {
        navbar.classList.remove('shadow-md');
        navbar.classList.replace('h-16', 'h-20');
    }
});

const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('bg-primary', 'text-white', 'shadow-lg');
            b.classList.add('bg-gray-100', 'dark:bg-gray-800', 'text-gray-600', 'dark:text-gray-300');
        });
        btn.classList.add('bg-primary', 'text-white', 'shadow-lg');
        btn.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'text-gray-600', 'dark:text-gray-300');

        const category = btn.getAttribute('data-filter');
        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                if (category === 'all' || item.classList.contains(category)) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            }, 300);
        });
    });
});

const selectContainer = document.getElementById('custom-select-container');
const selectTrigger = document.getElementById('custom-select-trigger');
const selectOptions = document.getElementById('custom-select-options');
const selectArrow = document.getElementById('select-arrow');
const selectedText = document.getElementById('selected-text');
const hiddenInput = document.getElementById('guests-input');
const options = document.querySelectorAll('.option-item');

selectTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = !selectOptions.classList.contains('invisible');

    if (isOpen) {
        closeDropdown();
    } else {
        openDropdown();
    }
});

function openDropdown() {
    selectOptions.classList.remove('invisible', 'opacity-0', '-translate-y-2');
    selectOptions.classList.add('dropdown-enter');
    selectArrow.classList.add('rotate-180');
}

function closeDropdown() {
    selectOptions.classList.add('invisible', 'opacity-0', '-translate-y-2');
    selectOptions.classList.remove('dropdown-enter');
    selectArrow.classList.remove('rotate-180');
}

options.forEach(option => {
    option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        selectedText.innerText = value;
        hiddenInput.value = value;
        closeDropdown();
    });
});

document.addEventListener('click', (e) => {
    if (!selectContainer.contains(e.target)) {
        closeDropdown();
    }
});

document.getElementById('res-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalContent = btn.innerHTML;

    btn.innerHTML = `<i data-lucide="loader" class="w-6 h-6 animate-spin"></i> جاري الحجز...`;
    lucide.createIcons();
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = `<i data-lucide="check" class="w-6 h-6"></i> تم الحجز بنجاح!`;
        btn.classList.replace('bg-primary', 'bg-green-600');
        btn.classList.replace('shadow-orange-500/30', 'shadow-green-500/30');
        lucide.createIcons();
        e.target.reset();
        selectedText.innerText = "شخصين";
        hiddenInput.value = "شخصين";

        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.disabled = false;
            btn.classList.replace('bg-green-600', 'bg-primary');
            btn.classList.replace('shadow-green-500/30', 'shadow-orange-500/30');
            lucide.createIcons();
        }, 3000);
    }, 2000);
});