document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const menuGrid = document.getElementById('menu-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const dishCards = document.querySelectorAll('.dish-card');
    
    // Add click event to all dish cards including carousel
    dishCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('img').alt;
            const dish = menuData.items.find(d => d.name === name);
            if (dish) {
                window.location.href = `product-details.html?id=${dish.id}`;
            }
        });
    });

    // Add click event to carousel items
    const carouselItems = document.querySelectorAll('.dishes-carousel .dish-card');
    carouselItems.forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            if (id) {
                window.location.href = `product-details.html?id=${id}`;
            }
        });
    });

    // Current filter and search state
    let currentCategory = 'all';
    let searchQuery = '';
    
    // Initialize the menu
    displayMenuItems();
    
    // Event listeners for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.getAttribute('data-category');
            displayMenuItems();
        });
    });
    
    // Search functionality
    searchBtn.addEventListener('click', function() {
        searchQuery = searchInput.value.trim().toLowerCase();
        displayMenuItems();
    });
    
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchQuery = searchInput.value.trim().toLowerCase();
            displayMenuItems();
        }
    });
    
    function displayMenuItems() {
        if (!menuGrid) return;
        
        menuGrid.innerHTML = '';
        
        const filteredItems = menuData.items.filter(item => {
            const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
            const matchesSearch = searchQuery === '' || 
                item.name.toLowerCase().includes(searchQuery) || 
                item.description.toLowerCase().includes(searchQuery);
            
            return matchesCategory && matchesSearch;
        });
        
        if (filteredItems.length === 0) {
            menuGrid.innerHTML = `
                <div class="no-results">
                    <p>No items found. Try a different search or category.</p>
                </div>
            `;
        } else {
            filteredItems.forEach(item => {
                const menuItem = createMenuItemElement(item);
                menuGrid.appendChild(menuItem);
            });
        }
    }
    
    function createMenuItemElement(item) {
        const menuItem = document.createElement('div');
        menuItem.className = 'dish-card';
        menuItem.innerHTML = `
            <div class="favorite-toggle">
                <i class="far fa-heart"></i>
            </div>
            <img src="${item.image}" class="dish-image" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="dish-footer">
                <span class="price">$${item.price.toFixed(2)}</span>
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <span>${item.rating}</span>
                </div>
            </div>
        `;
        
        // Add click event for favorite toggle
        const favoriteToggle = menuItem.querySelector('.favorite-toggle');
        favoriteToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#FF6B6B';
                showToast(`${item.name} added to favorites!`);
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
                showToast(`${item.name} removed from favorites!`);
            }
        });
        
        // Add click event to navigate to product details
        menuItem.addEventListener('click', function() {
            window.location.href = `product-details.html?id=${item.id}`;
        });
        
        return menuItem;
    }
});
