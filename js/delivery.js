document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const deliveryOption = document.getElementById('delivery-option');
    const pickupOption = document.getElementById('pickup-option');
    const addressForm = document.getElementById('address-form');
    const pickupForm = document.getElementById('pickup-form');
    const addressInput = document.getElementById('address');
    const deliveryNotes = document.getElementById('delivery-notes');
    const findOnMapBtn = document.getElementById('find-on-map');
    const continueBtn = document.getElementById('continue-btn');
    const pickupContinueBtn = document.getElementById('pickup-continue-btn');
    const pickupTimeSelect = document.getElementById('pickup-time');
    
    // Check if user came from cart page
    checkCartBeforeProceed();
    
    // Event listeners
    if (deliveryOption) {
        deliveryOption.addEventListener('click', function() {
            setDeliveryMode('delivery');
        });
    }
    
    if (pickupOption) {
        pickupOption.addEventListener('click', function() {
            setDeliveryMode('pickup');
        });
    }
    
    if (findOnMapBtn) {
        findOnMapBtn.addEventListener('click', function() {
            // In a real implementation, this would open a map interface
            showToast('Map functionality would be displayed here');
        });
    }
    
    if (continueBtn) {
        continueBtn.addEventListener('click', function(e) {
            e.preventDefault();
            processDeliveryOrder();
        });
    }
    
    if (pickupContinueBtn) {
        pickupContinueBtn.addEventListener('click', function(e) {
            e.preventDefault();
            processPickupOrder();
        });
    }
    
    // Functions
    function setDeliveryMode(mode) {
        if (mode === 'delivery') {
            deliveryOption.classList.add('active');
            pickupOption.classList.remove('active');
            addressForm.style.display = 'block';
            pickupForm.style.display = 'none';
        } else if (mode === 'pickup') {
            deliveryOption.classList.remove('active');
            pickupOption.classList.add('active');
            addressForm.style.display = 'none';
            pickupForm.style.display = 'block';
        }
    }
    
    function processDeliveryOrder() {
        const address = addressInput.value.trim();
        const notes = deliveryNotes.value.trim();
        
        if (!address) {
            showToast('Please enter your delivery address');
            return;
        }
        
        // Store delivery info
        const deliveryInfo = {
            mode: 'delivery',
            address: address,
            notes: notes
        };
        
        localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
        
        // In a real application, this would proceed to payment page
        showOrderConfirmation('delivery');
    }
    
    function processPickupOrder() {
        const selectedLocation = document.querySelector('input[name="pickup-location"]:checked');
        const pickupTime = pickupTimeSelect.value;
        
        if (!pickupTime) {
            showToast('Please select a pickup time');
            return;
        }
        
        // Get location details
        const locationLabel = document.querySelector(`label[for="${selectedLocation.id}"]`);
        const locationName = locationLabel.querySelector('strong').textContent;
        const locationAddress = locationLabel.querySelector('p').textContent;
        
        // Store pickup info
        const pickupInfo = {
            mode: 'pickup',
            location: locationName,
            address: locationAddress,
            time: pickupTime
        };
        
        localStorage.setItem('deliveryInfo', JSON.stringify(pickupInfo));
        
        // In a real application, this would proceed to payment page
        showOrderConfirmation('pickup');
    }
    
    function showOrderConfirmation(mode) {
        // Get cart items and total
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1;
        const total = subtotal + tax;
        
        // Create a modal for order confirmation
        const modal = document.createElement('div');
        modal.className = 'order-confirmation-modal';
        
        let deliveryDetails = '';
        if (mode === 'delivery') {
            const deliveryInfo = JSON.parse(localStorage.getItem('deliveryInfo'));
            deliveryDetails = `
                <div class="delivery-details">
                    <p><strong>Delivery Address:</strong> ${deliveryInfo.address}</p>
                    ${deliveryInfo.notes ? `<p><strong>Notes:</strong> ${deliveryInfo.notes}</p>` : ''}
                </div>
            `;
        } else {
            const pickupInfo = JSON.parse(localStorage.getItem('deliveryInfo'));
            deliveryDetails = `
                <div class="delivery-details">
                    <p><strong>Pickup Location:</strong> ${pickupInfo.location}</p>
                    <p><strong>Address:</strong> ${pickupInfo.address}</p>
                    <p><strong>Pickup Time:</strong> ${pickupInfo.time === 'asap' ? 'As soon as possible' : pickupInfo.time}</p>
                </div>
            `;
        }
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Order Confirmation</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="confirmation-message">
                        <i class="fas fa-check-circle"></i>
                        <p>Your order has been placed successfully!</p>
                    </div>
                    
                    ${deliveryDetails}
                    
                    <div class="order-summary">
                        <h3>Order Summary</h3>
                        <div class="summary-items">
                            ${cart.map(item => `
                                <div class="summary-item">
                                    <span>${item.name} x ${item.quantity}</span>
                                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="summary-totals">
                            <div class="summary-row">
                                <span>Subtotal:</span>
                                <span>$${subtotal.toFixed(2)}</span>
                            </div>
                            <div class="summary-row">
                                <span>Tax:</span>
                                <span>$${tax.toFixed(2)}</span>
                            </div>
                            <div class="summary-row total">
                                <span>Total:</span>
                                <span>$${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn primary-btn" id="back-to-menu">Return to Menu</button>
                </div>
            </div>
        `;
        
        // Add the modal to the body
        document.body.appendChild(modal);
        
        // Add event listeners for modal buttons
        const closeModal = modal.querySelector('.close-modal');
        const backToMenuBtn = modal.querySelector('#back-to-menu');
        
        closeModal.addEventListener('click', function() {
            modal.remove();
        });
        
        backToMenuBtn.addEventListener('click', function() {
            // Clear cart after successful order
            localStorage.removeItem('cart');
            
            // Navigate back to menu
            window.location.href = 'menu.html';
        });
        
        // Add CSS for the modal
        const style = document.createElement('style');
        style.textContent = `
            .order-confirmation-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            
            .modal-content {
                background-color: white;
                border-radius: 8px;
                width: 90%;
                max-width: 500px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px;
                border-bottom: 1px solid #e9ecef;
            }
            
            .modal-header h2 {
                margin: 0;
            }
            
            .close-modal {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
            }
            
            .modal-body {
                padding: 16px;
            }
            
            .confirmation-message {
                text-align: center;
                margin-bottom: 20px;
            }
            
            .confirmation-message i {
                color: #28A745;
                font-size: 48px;
                margin-bottom: 10px;
            }
            
            .delivery-details {
                background-color: #f8f9fa;
                padding: 16px;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            
            .order-summary h3 {
                margin-bottom: 16px;
            }
            
            .summary-items {
                margin-bottom: 16px;
            }
            
            .summary-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
            }
            
            .summary-totals {
                border-top: 1px solid #e9ecef;
                padding-top: 16px;
            }
            
            .summary-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
            }
            
            .summary-row.total {
                font-weight: bold;
                font-size: 18px;
                margin-top: 8px;
            }
            
            .modal-footer {
                padding: 16px;
                border-top: 1px solid #e9ecef;
                text-align: center;
            }
        `;
        document.head.appendChild(style);
    }
    
    function checkCartBeforeProceed() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            // If cart is empty, redirect to menu page
            window.location.href = 'menu.html';
            return;
        }
    }
});
