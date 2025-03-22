document.addEventListener("DOMContentLoaded", function() {
    const methods = document.querySelectorAll(".method");
    const confirmBtn = document.getElementById("confirm-btn");
    const cardNumber = document.getElementById("card-number");
    const expiryDate = document.getElementById("expiry-date");
    const cvv = document.getElementById("cvv");

    // Payment method selection
    methods.forEach(method => {
        method.addEventListener("click", function() {
            methods.forEach(m => m.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Card number formatting
    cardNumber.addEventListener("input", function(event) {
        let value = event.target.value.replace(/\D/g, "").substring(0, 16);
        value = value.replace(/(\d{4})/g, "$1 ").trim();
        event.target.value = value;
    });

    // Expiry date formatting
    expiryDate.addEventListener("input", function(event) {
        let value = event.target.value.replace(/\D/g, "").substring(0, 4);
        if (value.length > 2) {
            value = value.slice(0, 2) + " / " + value.slice(2);
        }
        event.target.value = value;
    });

    // CVV validation (only numbers, max length 3)
    cvv.addEventListener("input", function(event) {
        event.target.value = event.target.value.replace(/\D/g, "").substring(0, 3);
    });

    // Handle confirm button click
    confirmBtn.addEventListener("click", function() {
        if (cardNumber.value.length < 19) {
            alert("Please enter a valid card number.");
            return;
        }

        if (expiryDate.value.length < 5) {
            alert("Please enter a valid expiry date.");
            return;
        }

        if (cvv.value.length < 3) {
            alert("Please enter a valid CVV.");
            return;
        }

        alert("Payment processed successfully!");
    });
});
