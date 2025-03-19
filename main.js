import { dishes } from "./restaurant.js";

console.log("Available dishes:", dishes);
console.log("Categories:", Object.values(dishes).map(dish => dish.category));

document.addEventListener("DOMContentLoaded", function () {
    // Cart and modal data
    let cartItems = [];
    let cartCount = 0;
    let currentDish = {};
    let currentQuantity = 1;
    let selectedIngredients = [];
    let currentTotalPrice = 0;

    // Add tab switching functionality
    document.querySelectorAll(".menu-options button").forEach(button => {
        button.addEventListener("click", function () {
            let tabId = this.getAttribute("data-tab");
            openTab(tabId);
        });
    });

    // Initial setup - open the "all" tab by default
    openTab("all");

    function openTab(tabId) {
        console.log("Tab clicked:", tabId);
    
        // Remove active class from all buttons
        document.querySelectorAll('.menu-options button').forEach(button => button.classList.remove('active'));
        
        // Add active class to clicked button
        let clickedButton = document.querySelector(`.menu-options button[data-tab="${tabId}"]`);
        if (clickedButton) {
            clickedButton.classList.add('active');
        }
        
        // Hide all tabs
        document.querySelectorAll('.food-container').forEach(content => content.classList.remove('active'));
        
        // Show the selected tab
        let selectedTab = document.getElementById(tabId);
        if (selectedTab) {
            selectedTab.classList.add('active');
            bindFoodCardClicks();
        } else {
            console.error(`Tab with ID "${tabId}" not found`);
        }
    }
      
    function bindFoodCardClicks() {
        document.querySelectorAll(".food-card").forEach(card => {
            card.addEventListener("click", function (e) {
                if (!e.target.closest('.favorite')) {  // Ignore clicks on favorite button
                    const dishId = card.getAttribute("data-id");
                    if (dishes[dishId]) {
                        openDishModal(dishes[dishId]);
                    } else {
                        console.error(`Dish with ID "${dishId}" not found.`);
                    }
                }
            });
        });
    }

    function populateTab(tabId, category) {
        const tabElement = document.getElementById(tabId);
        if (!tabElement) {
            console.error(`Tab element with ID "${tabId}" not found.`);
            return;
        }
    
        tabElement.innerHTML = ""; // Clear previous content
        
        console.log(`Populating tab ${tabId} with category ${category}`);
        let dishCount = 0;
    
        for (let key in dishes) { 
            if (dishes.hasOwnProperty(key)) {
                let dish = dishes[key];
                
                // For "all" category or if the dish category matches the requested category
                if (category === "all" || dish.category === category) {
                    console.log(`Adding dish ${key} to tab ${tabId}`);
                    dishCount++;
    
                    let dishCard = document.createElement("div");
                    dishCard.classList.add("food-card");
                    dishCard.setAttribute("data-id", key);
    
                    dishCard.innerHTML = `
                        <div class="favorite"><i class="fa fa-heart"></i></div>
                        <div class="food-image"><img src="${dish.image}" alt="${dish.title}"></div>
                        <div class="food-info">
                            <h3>${dish.title}</h3>
                            <p class="description">${dish.description || "No description available."}</p>
                            <div class="food-price-rating">
                                <span class="price">${formatPrice(dish.basePrice)}</span>
                                <span class="rating"><i class="fa fa-star"></i> ${dish.rating || "N/A"}</span>
                            </div>
                        </div>
                    `;
    
                    tabElement.appendChild(dishCard);
                }
            }
        }
        
        console.log(`Added ${dishCount} dishes to tab ${tabId}`);
        
        if (dishCount === 0) {
            tabElement.innerHTML = `<div class="no-dishes">No dishes found in this category.</div>`;
        }
    }
    
    // Populate all tabs
    populateTab("all", "all");
    populateTab("main_dishes", "main_dishes");
    populateTab("drinks", "drinks");
    populateTab("desserts", "desserts");
    populateTab("breakfast", "breakfast");

    // Toggle favorite when heart is clicked
    document.addEventListener('click', function (e) {
        if (e.target.closest('.favorite')) {
            e.stopPropagation();
            const icon = e.target.closest('.favorite').querySelector('i');
            icon.classList.toggle('fa-regular');
            icon.classList.toggle('fa-solid');
            icon.style.color = icon.classList.contains('fa-solid') ? '#e63946' : '';
        }
    });

    // Get DOM elements
    const modal = document.getElementById("dishModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalPrice = document.getElementById("modalPrice");
    const modalRating = document.getElementById("modalRating");
    const ingredientsList = document.getElementById("ingredientsList");
    const totalPriceElement = document.getElementById("totalPrice");
    const quantityInput = document.getElementById("quantity");
    const decreaseQuantityBtn = document.getElementById("decreaseQuantity");
    const increaseQuantityBtn = document.getElementById("increaseQuantity");
    const closeButton = document.querySelector(".close");
    // Add cart icon reference
    const cartIcon = document.querySelector(".cart-icon");

    // Open dish modal
    function openDishModal(dish) {
        console.log("Opening modal for dish:", dish);
        
        if (!dish) {
            console.error("Dish data is undefined.");
            return;
        }

        currentDish = dish;
        selectedIngredients = [];
        currentQuantity = 1;
        quantityInput.value = 1;

        modalImage.src = dish.image;
        modalTitle.textContent = dish.title;
        modalDescription.textContent = dish.description;
        modalPrice.textContent = formatPrice(dish.basePrice);
        modalRating.innerHTML = `<i class="fa fa-star"></i> ${dish.rating}`;

        ingredientsList.innerHTML = "";

        if (dish.ingredients && dish.ingredients.length > 0) {
            dish.ingredients.forEach((ingredient, index) => {
                if (!ingredient.included) {
                    const ingredientItem = document.createElement("div");
                    ingredientItem.className = "ingredient-item";
                    ingredientItem.innerHTML = `
                        <input type="checkbox" id="ingredient-${index}" name="ingredient" data-index="${index}">
                        <label for="ingredient-${index}">
                            ${ingredient.name} <span class="price-tag">+${formatPrice(ingredient.price)}</span>
                        </label>
                    `;
                    ingredientsList.appendChild(ingredientItem);
                }
            });
        }

        calculateTotalPrice();
        modal.style.display = "block";
    }

    // Handle ingredient selection
    ingredientsList.addEventListener('change', function (e) {
        if (e.target.type === 'checkbox') {
            const ingredientIndex = parseInt(e.target.dataset.index);

            if (e.target.checked) {
                if (!selectedIngredients.includes(ingredientIndex)) {
                    selectedIngredients.push(ingredientIndex);
                }
            } else {
                selectedIngredients = selectedIngredients.filter(index => index !== ingredientIndex);
            }

            calculateTotalPrice();
        }
    });

    // Handle quantity changes
    decreaseQuantityBtn.addEventListener('click', function () {
        if (currentQuantity > 1) {
            currentQuantity--;
            quantityInput.value = currentQuantity;
            calculateTotalPrice();
        }
    });

    increaseQuantityBtn.addEventListener('click', function () {
        currentQuantity++;
        quantityInput.value = currentQuantity;
        calculateTotalPrice();
    });

    // Add to cart functionality
    const addToCartBtn = document.getElementById("addToCartBtn");
    const cartBadge = document.getElementById("cart-badge");

    addToCartBtn.addEventListener('click', function () {
        if (!currentDish) return;

        const additionalIngredients = selectedIngredients.map(index => {
            return {
                name: currentDish.ingredients[index].name,
                price: currentDish.ingredients[index].price
            };
        });

        const cartItem = {
            id: Date.now(),
            title: currentDish.title,
            basePrice: currentDish.basePrice,
            quantity: currentQuantity,
            additionalIngredients: additionalIngredients,
            totalPrice: currentTotalPrice
        };

        cartItems.push(cartItem);
        cartCount += currentQuantity;

        console.log("Added to cart:", cartItem);
        console.log("Current cart items:", cartItems);

        if (cartBadge) {
            cartBadge.textContent = cartCount;
        } else {
            console.warn("Cart badge element not found.");
        }
        saveCart();
        addToCartBtn.textContent = "Added to Cart!";
        addToCartBtn.style.backgroundColor = "#2e7d32";

        setTimeout(() => {
            addToCartBtn.innerHTML = '<i class="fa fa-shopping-cart"></i> Add to Cart';
            addToCartBtn.style.backgroundColor = "#4CAF50";
        }, 1500);
    });

    // Close modal
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Format price
    function formatPrice(price) {
        return 'GHc' + parseFloat(price).toFixed(2);
    }

    // Calculate total price
    function calculateTotalPrice() {
        if (!currentDish) {
            console.error("Error: currentDish is not defined.");
            return;
        }

        let total = currentDish.basePrice;

        if (currentDish.ingredients) {
            selectedIngredients.forEach(ingredientIndex => {
                if (currentDish.ingredients[ingredientIndex] && !currentDish.ingredients[ingredientIndex].included) {
                    total += currentDish.ingredients[ingredientIndex].price;
                }
            });
        }

        total *= currentQuantity;
        currentTotalPrice = total;
        totalPriceElement.textContent = formatPrice(total);
    }

    // Get references to elements
    const searchInput = document.getElementById("search-bar");
    const searchContainer = document.querySelector(".search-container");

    // Create dropdown element for search results
    const searchDropdown = document.createElement("div");
    searchDropdown.className = "search-dropdown";
    searchDropdown.style.display = "none";
    searchContainer.appendChild(searchDropdown);

    // Add styles for the dropdown
    const style = document.createElement("style");
    style.textContent = `
      .search-container {
        position: relative;
      }
      
      .search-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: white;
        border: 1px solid #ddd;
        border-top: none;
        max-height: 300px;
        overflow-y: auto;
        z-index: 100;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }
      
      .search-item {
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
      
      .search-item:hover {
        background-color: #f5f5f5;
      }
      
      .search-item img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        margin-right: 10px;
        border-radius: 4px;
      }
      
      .search-item-details {
        flex: 1;
      }
      
      .search-item-title {
        font-weight: bold;
        margin-bottom: 3px;
      }
      
      .search-item-price {
        color: #555;
        font-size: 0.9em;
      }
      
      .no-results-item {
        padding: 10px 15px;
        color: #888;
        font-style: italic;
      }
    `;
    document.head.appendChild(style);

    // Function to get all dishes from all categories
    function getAllDishes() {
      const allDishes = [];
      
      // Assuming 'dishes' is your global dishes object
      if (typeof dishes === 'object') {
        Object.keys(dishes).forEach(key => {
          allDishes.push({...dishes[key], id: key});
        });
      }
      
      return allDishes;
    }

    // Function to update the search dropdown
    function updateSearchDropdown() {
      const query = searchInput.value.toLowerCase().trim();
      
      // Clear previous results
      searchDropdown.innerHTML = '';
      
      // Hide dropdown if query is empty
      if (query === '') {
        searchDropdown.style.display = 'none';
        return;
      }
      
      // Get all dishes
      const allDishes = getAllDishes();
      
      // Filter dishes based on search query
      const matchingDishes = allDishes.filter(dish => 
        dish.title.toLowerCase().includes(query) || 
        (dish.description && dish.description.toLowerCase().includes(query))
      );
      
      // Show dropdown
      searchDropdown.style.display = 'block';
      
      // Add matching dishes to dropdown
      if (matchingDishes.length > 0) {
        matchingDishes.forEach(dish => {
          const dishItem = document.createElement('div');
          dishItem.className = 'search-item';
          
          dishItem.innerHTML = `
            <img src="${dish.image}" alt="${dish.title}">
            <div class="search-item-details">
              <div class="search-item-title">${dish.title}</div>
              <div class="search-item-price">${formatPrice(dish.basePrice)}</div>
            </div>
          `;
          
          // Add click event to select this dish
          dishItem.addEventListener('click', () => {
            searchInput.value = dish.title;
            searchDropdown.style.display = 'none';
            
            // Navigate to the dish's category tab
            const categoryTab = document.querySelector(`button[data-tab='${dish.category}']`);
            if (categoryTab) {
              categoryTab.click();
            }
            
            // Find and highlight the dish
            setTimeout(() => {
              const dishCards = document.querySelectorAll('.food-card');
              dishCards.forEach(card => {
                if (card.getAttribute('data-id') === dish.id) {
                  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  card.style.boxShadow = '0 0 10px rgba(0,100,255,0.7)';
                  setTimeout(() => {
                    card.style.boxShadow = '';
                  }, 2000);
                }
              });
            }, 300);
          });
          
          searchDropdown.appendChild(dishItem);
        });
      } else {
        // Show no results message
        const noResults = document.createElement('div');
        noResults.className = 'no-results-item';
        noResults.textContent = `No dishes found matching "${query}"`;
        searchDropdown.appendChild(noResults);
      }
    }

    // Add event listeners
    searchInput.addEventListener('input', updateSearchDropdown);

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      if (!searchContainer.contains(event.target)) {
        searchDropdown.style.display = 'none';
      }
    });

    // Prevent dropdown from closing when clicking inside it
    searchDropdown.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    // Show dropdown when input is focused if there is text
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim() !== '') {
        updateSearchDropdown();
      }
    });

    // Function to generate order summary
    const cartModal = document.createElement("div");
    cartModal.id = "cartModal";
    document.body.appendChild(cartModal);

    // Setup cart modal
    cartModal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-modal-header">
                <h2>Your Cart</h2>
                <span class="close-cart">&times;</span>
            </div>
            <div class="cart-items-container">
                <!-- Cart items will be added here -->
            </div>
            <div class="cart-summary">
                <div class="cart-subtotal">Subtotal: <span id="cart-subtotal-amount">GHc0.00</span></div>
                <button class="checkout-btn">Proceed to Checkout</button>
                <button class="clear-cart-btn">Clear Cart</button>
            </div>
        </div>
    `;

    // Add styles for cart modal
    const cartStyles = document.createElement("style");
    cartStyles.textContent = `
        #cartModal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0px;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }
        
        .cart-modal-content {
            background-color: white;
            margin: 10% auto;
            padding: 20px;
            border-radius: 8px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .cart-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
        }
        
        .close-cart {
            font-size: 28px;
            cursor: pointer;
        }
        
        .cart-item {
            display: flex;
            padding: 15px 0;
            border-bottom: 1px solid #eee;
        }
        
        .cart-item-details {
            flex: 1;
        }
        
        .cart-item-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .cart-item-price {
            color: #555;
        }
        
        .cart-item-quantity {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        
        .cart-item-quantity button {
            background: #f0f0f0;
            border: none;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            cursor: pointer;
        }
        
        .cart-item-quantity input {
            width: 30px;
            text-align: center;
            margin: 0 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .cart-item-actions {
            display: flex;
            gap: 10px;
        }
        
        .cart-summary {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #eee;
        }
        
        .cart-subtotal {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        
        .checkout-btn, .clear-cart-btn {
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .checkout-btn {
            background-color: #4CAF50;
            color: white;
            margin-right: 10px;
        }
        
        .clear-cart-btn {
            background-color: #f44336;
            color: white;
        }
        
        .cart-empty-message {
            text-align: center;
            padding: 20px;
            color: #888;
            font-style: italic;
        }
        
        .remove-item-btn {
            background: none;
            border: none;
            color: #f44336;
            cursor: pointer;
            font-size: 14px;
        }
        
        .additional-ingredients {
            margin-top: 5px;
            font-size: 0.85em;
            color: #666;
        }
        
        .additional-ingredient {
            margin: 2px 0;
        }
    `;
    document.head.appendChild(cartStyles);

    // Function to display cart modal with items
    function showCartModal() {
        const cartItemsContainer = document.querySelector(".cart-items-container");
        cartItemsContainer.innerHTML = "";
        
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<div class="cart-empty-message">Your cart is empty</div>';
        } else {
            let subtotal = 0;
            
            cartItems.forEach(item => {
                const cartItemElement = document.createElement("div");
                cartItemElement.className = "cart-item";
                cartItemElement.dataset.id = item.id;
                
                // Create ingredients list HTML if there are any
                let ingredientsHtml = "";
                if (item.additionalIngredients && item.additionalIngredients.length > 0) {
                    ingredientsHtml = '<div class="additional-ingredients">';
                    item.additionalIngredients.forEach(ing => {
                        ingredientsHtml += `<div class="additional-ingredient">+ ${ing.name} (${formatPrice(ing.price)})</div>`;
                    });
                    ingredientsHtml += '</div>';
                }
                
                cartItemElement.innerHTML = `
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">${formatPrice(item.basePrice)} each</div>
                        ${ingredientsHtml}
                        <div class="cart-item-quantity">
                            <button class="decrease-item-qty">-</button>
                            <input type="number" value="${item.quantity}" min="1" max="99" readonly>
                            <button class="increase-item-qty">+</button>
                        </div>
                        <div class="cart-item-actions">
                            <button class="remove-item-btn">Remove</button>
                        </div>
                    </div>
                    <div class="cart-item-total">
                        ${formatPrice(item.totalPrice)}
                    </div>
                `;
                
                cartItemsContainer.appendChild(cartItemElement);
                subtotal += item.totalPrice;
                
                // Add event listeners to quantity buttons
                const decreaseBtn = cartItemElement.querySelector(".decrease-item-qty");
                const increaseBtn = cartItemElement.querySelector(".increase-item-qty");
                const removeBtn = cartItemElement.querySelector(".remove-item-btn");
                
                decreaseBtn.addEventListener("click", function() {
                    updateCartItemQuantity(item.id, -1);
                });
                
                increaseBtn.addEventListener("click", function() {
                    updateCartItemQuantity(item.id, 1);
                });
                
                removeBtn.addEventListener("click", function() {
                    removeCartItem(item.id);
                });
            });
            
            // Update subtotal
            document.getElementById("cart-subtotal-amount").textContent = formatPrice(subtotal);
        }
        
        cartModal.style.display = "block";
    }

    // Function to update cart item quantity
    function updateCartItemQuantity(itemId, change) {
        const itemIndex = cartItems.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1) {
            const item = cartItems[itemIndex];
            const newQuantity = item.quantity + change;
            
            if (newQuantity < 1) {
                removeCartItem(itemId);
                return;
            }
            
            // Update quantity and total price
            item.quantity = newQuantity;
            item.totalPrice = (item.basePrice + getAdditionalIngredientsPrice(item)) * newQuantity;
            
            // Update cart count
            cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
            
            // Save cart
            saveCart();
            
            // Update UI
            showCartModal();
            updateCartBadge();
        }
    }

    // Function to remove cart item
    function removeCartItem(itemId) {
        const itemIndex = cartItems.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1) {
            const item = cartItems[itemIndex];
            cartCount -= item.quantity;
            cartItems.splice(itemIndex, 1);
            
            // Save cart
            saveCart();
            
            // Update UI
            showCartModal();
            updateCartBadge();
        }
    }

    // Function to clear cart
    function clearCart() {
        if (confirm("Are you sure you want to clear your cart?")) {
            cartItems = [];
            cartCount = 0;
            saveCart();
            showCartModal();
            updateCartBadge();
        }
    }

    // Function to calculate additional ingredients price
    function getAdditionalIngredientsPrice(item) {
        if (!item.additionalIngredients) return 0;
        
        return item.additionalIngredients.reduce((total, ingredient) => {
            return total + ingredient.price;
        }, 0);
    }

    // Function to update cart badge
    function updateCartBadge() {
        const cartBadge = document.getElementById("cart-badge");
        if (cartBadge) {
            cartBadge.textContent = cartCount;
        }
    }

    // Function to save cart to localStorage
    function saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartCount', cartCount.toString());
        updateCartBadge();
    }

    // Function to load cart from localStorage
    function loadCart() {
        const savedCartItems = localStorage.getItem('cartItems');
        const savedCartCount = localStorage.getItem('cartCount');
        
        if (savedCartItems) {
            cartItems = JSON.parse(savedCartItems);
        }
        
        if (savedCartCount) {
            cartCount = parseInt(savedCartCount);
            updateCartBadge();
        }
    }

    // Load cart from localStorage when the page loads
    loadCart();
    
    // Set up event listeners for cart modal
    if (cartIcon) {
        cartIcon.addEventListener("click", function(e) {
            e.preventDefault();
            showCartModal();
        });
    } else {
        console.warn("Cart icon element not found. Make sure you have an element with class 'cart-icon'");
    }
    
    // Close cart modal when clicking the close button
    document.querySelector(".close-cart").addEventListener("click", function() {
        cartModal.style.display = "none";
    });
    
    // Close cart modal when clicking outside
    window.addEventListener("click", function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });
    
    // Clear cart button
    document.querySelector(".clear-cart-btn").addEventListener("click", function() {
        clearCart();
    });
    
    // Checkout button
    document.querySelector(".checkout-btn").addEventListener("click", function() {
        if (cartItems.length > 0) {
            alert("Proceeding to checkout with " + cartItems.length + " items.");
            // You would typically redirect to a checkout page here
        } else {
            alert("Your cart is empty. Add some items before checking out.");
        }
    });
});