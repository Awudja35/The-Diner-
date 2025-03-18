import { dishes } from "./restaurant.js";

console.log("Available dishes:", dishes);
console.log("Categories:", Object.values(dishes).map(dish => dish.category));

document.addEventListener("DOMContentLoaded", function () {
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

    // Cart and modal data
    let cartItems = [];
    let cartCount = 0;
    let currentDish = null;
    let currentQuantity = 1;
    let selectedIngredients = [];
    let currentTotalPrice = 0;

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
    const addToCartBtn = document.getElementById("addToCartBtn");
    const closeButton = document.querySelector(".close");
    const cartBadge = document.querySelector(".cart-badge");

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

        addToCartBtn.textContent = "Added to Cart!";
        addToCartBtn.style.backgroundColor = "#2e7d32";

        setTimeout(() => {
            addToCartBtn.innerHTML = '<i class="fa fa-shopping-cart"></i> Add to Cart';
            addToCartBtn.style.backgroundColor = "#4CAF50";
        }, 1500);

        setTimeout(() => {
            modal.style.display = "none";
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
});