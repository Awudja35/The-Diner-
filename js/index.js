document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                createMobileMenu();
            }
            
            const mobileMenu = document.querySelector('.mobile-menu');
            mobileMenu.classList.add('active');
        });
    }
    
    // Header scroll behavior
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY) {
            // Scrolling down
            header.classList.add('hide');
        } else {
            // Scrolling up
            header.classList.remove('hide');
        }
        lastScrollY = window.scrollY;
    });

    // Function to create mobile menu
    function createMobileMenu() {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        const mobileMenuContent = `
            <div class="mobile-menu-header">
                <div class="logo">
                    <a href="index.html">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="15" fill="#FF6B6B"/>
                            <path d="M15 7C11.1 7 8 10.1 8 14C8 17.9 15 23 15 23C15 23 22 17.9 22 14C22 10.1 18.9 7 15 7ZM15 16C13.9 16 13 15.1 13 14C13 12.9 13.9 12 15 12C16.1 12 17 12.9 17 14C17 15.1 16.1 16 15 16Z" fill="white"/>
                        </svg>
                        <span>restaurant</span>
                    </a>
                </div>
                <button class="mobile-menu-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <nav>
                <ul class="mobile-nav">
                    <li><a href="menu.html">Menu</a></li>
                    <li><a href="cart.html">Cart</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
            <div class="mobile-cta">
                <a href="#" class="btn primary-btn">Book a table</a>
            </div>
        `;
        
        mobileMenu.innerHTML = mobileMenuContent;
        document.body.appendChild(mobileMenu);
        
        // Close mobile menu when close button is clicked
        const closeBtn = mobileMenu.querySelector('.mobile-menu-close');
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }
    
    // Show toast notification
    window.showToast = function(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        const toastMessage = document.getElementById('toast-message');
        if (toastMessage) {
            toastMessage.textContent = message;
        }
        
        toast.classList.add('show');
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };
    
    // Format price
    window.formatPrice = function(price) {
        return '$' + parseFloat(price).toFixed(2);
    };
});
