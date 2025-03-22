document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = Number(urlParams.get('id'));
    
    // Get DOM elements
    const productImage = document.querySelector('.product-image');
    const productName = document.getElementById('product-name');
    const productRating = document.getElementById('product-rating');
    const productPrice = document.getElementById('product-price');
    const productDescription = document.getElementById('product-description');
    const ingredientsList = document.getElementById('ingredients-list');
    const favoriteBtn = document.getElementById('favorite-btn');
    const quantityElement = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const relatedProducts = document.getElementById('related-products');
    
    // Current quantity
    let quantity = 1;
    
    // Find product by ID
    const product = menuData.items.find(item => item.id === productId);
    
    // If product not found, redirect to menu page
    if (!product) {
        window.location.href = 'menu.html';
        return;
    }
    
    // Update product details on page
    displayProductDetails(product);
    displayRelatedProducts(product);
    
    // Event listeners
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', toggleFavorite);
    }
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', decreaseQuantity);
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', increaseQuantity);
    }
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCart);
    }
    
    // Functions
    function displayProductDetails(product) {
        // Set product details
        document.title = `${product.name} - Restaurant`;
        
        if (productImage) {
            productImage.style.backgroundImage = `url(${product.image})`;
        }
        
        if (productName) {
            productName.textContent = product.name;
        }
        
        if (productRating) {
            productRating.textContent = product.rating;
        }
        
        if (productPrice) {
            productPrice.textContent = `$${product.price.toFixed(2)}`;
        }
        
        if (productDescription) {
            productDescription.textContent = product.description;
        }
        
        // Display ingredients
        if (ingredientsList) {
            ingredientsList.innerHTML = '';
            product.ingredients.forEach(ingredient => {
                const ingredientItem = document.createElement('div');
                ingredientItem.className = 'ingredient-item';
                ingredientItem.innerHTML = `
                    <input type="checkbox" id="ingredient-${ingredient.toLowerCase().replace(/\s+/g, '-')}">
                    <label>${ingredient}</label>
                `;
                ingredientsList.appendChild(ingredientItem);
            });
        }
    }
    
    function displayRelatedProducts(currentProduct) {
        if (!relatedProducts) return;
        
        // Find related products (same category, excluding current product)
        const related = menuData.items.filter(item => 
            item.category === currentProduct.category && item.id !== currentProduct.id
        ).slice(0, 3); // Get up to 3 related products
        
        // Clear existing items
        relatedProducts.innerHTML = '';
        
        // Display related products
        related.forEach(item => {
            const relatedItem = document.createElement('div');
            relatedItem.className = 'dish-card';
            relatedItem.innerHTML = `
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
            
            // Add click event to navigate to product details
            relatedItem.addEventListener('click', function() {
                window.location.href = `product-details.html?id=${item.id}`;
            });
            
            relatedProducts.appendChild(relatedItem);
        });
    }
    
    function toggleFavorite() {
        const icon = favoriteBtn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            showToast('Added to favorites!');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            showToast('Removed from favorites!');
        }
    }
    
    function decreaseQuantity() {
        if (quantity > 1) {
            quantity--;
            updateQuantityDisplay();
        }
    }
    
    function increaseQuantity() {
        quantity++;
        updateQuantityDisplay();
    }
    
    function updateQuantityDisplay() {
        if (quantityElement) {
            quantityElement.textContent = quantity;
        }
    }
    
    function addToCart() {
        // Get existing cart from localStorage or initialize empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already exists in cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
            // Update quantity if already in cart
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity,
                rating: product.rating
            });
        }
        
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show confirmation
        showToast('Item added to cart!');
        
        // Reset quantity
        quantity = 1;
        updateQuantityDisplay();
    }
});
