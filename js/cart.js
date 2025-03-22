document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyMessage = document.getElementById('cart-empty');
    const cartSummary = document.getElementById('cart-summary');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const updateCartBtn = document.getElementById('update-cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    const closeCartBtn = document.getElementById('close-cart');
    
    // Tax rate (10%)
    const TAX_RATE = 0.1;
    
    // Initialize cart
    loadCart();
    
    // Event listeners
    if (updateCartBtn) {
        updateCartBtn.addEventListener('click', function() {
            localStorage.setItem('cart', JSON.stringify(getCartItems()));
            showToast('Cart updated successfully!');
            loadCart();
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', function() {
            window.location.href = 'menu.html';
        });
    }
    
    // Functions
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Show/hide elements based on cart
        if (cart.length === 0) {
            if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
            if (cartSummary) cartSummary.style.display = 'none';
            if (cartItemsContainer) cartItemsContainer.style.display = 'none';
        } else {
            if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
            if (cartSummary) cartSummary.style.display = 'block';
            if (cartItemsContainer) {
                cartItemsContainer.style.display = 'block';
                displayCartItems(cart);
            }
            
            updateCartSummary(cart);
        }
    }
    
    function displayCartItems(cart) {
        if (!cartItemsContainer) return;
        
        // Clear existing items
        cartItemsContainer.innerHTML = '';
        
        // Display each cart item
        cart.forEach(item => {
            const cartItem = createCartItemElement(item);
            cartItemsContainer.appendChild(cartItem);
        });
    }
    
    function createCartItemElement(item) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.dataset.id = item.id;
        
        // Get the image class name from the full path
        const imageClass = `dish-${item.id}`; // This ensures we use the correct class name for CSS background image
        
        cartItem.innerHTML = `
            <div class="cart-item-image ${imageClass}"></div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-rating">
                    <i class="fas fa-star"></i>
                    <span>${item.rating}</span>
                </div>
                <div class="cart-item-actions">
                    <div class="item-quantity">
                        <button class="decrease-item">-</button>
                        <span class="item-count">${item.quantity}</span>
                        <button class="increase-item">+</button>
                    </div>
                    <button class="remove-item">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Event listeners for cart item controls
        const decreaseBtn = cartItem.querySelector('.decrease-item');
        const increaseBtn = cartItem.querySelector('.increase-item');
        const removeBtn = cartItem.querySelector('.remove-item');
        const quantityElement = cartItem.querySelector('.item-count');
        
        decreaseBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
                updateCartSummary(getCartItems());
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            updateCartSummary(getCartItems());
        });
        
        removeBtn.addEventListener('click', function() {
            cartItem.remove();
            
            // Update cart display after removal
            const cartItems = getCartItems();
            if (cartItems.length === 0) {
                if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
                if (cartSummary) cartSummary.style.display = 'none';
                if (cartItemsContainer) cartItemsContainer.style.display = 'none';
            } else {
                updateCartSummary(cartItems);
            }
            
            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cartItems));
            
            // Show notification
            showToast('Item removed from cart!');
        });
        
        return cartItem;
    }
    
    function getCartItems() {
        // Get all cart items from DOM
        const cartItems = [];
        const cartItemElements = document.querySelectorAll('.cart-item');
        
        cartItemElements.forEach(element => {
            const id = parseInt(element.dataset.id);
            const name = element.querySelector('.cart-item-title').textContent;
            const price = parseFloat(element.querySelector('.cart-item-price').textContent.substring(1));
            const quantity = parseInt(element.querySelector('.item-count').textContent);
            const rating = parseFloat(element.querySelector('.cart-item-rating span').textContent);
            const imageClass = element.querySelector('.cart-item-image').className.split(' ')[1];
            
            cartItems.push({
                id,
                name,
                price,
                quantity,
                rating,
                image: imageClass
            });
        });
        
        return cartItems;
    }
    
    function updateCartSummary(cart) {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;
        
        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    }
});
