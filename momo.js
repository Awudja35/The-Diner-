document.addEventListener("DOMContentLoaded", function() {
    const methods = document.querySelectorAll(".method");
    const confirmBtn = document.getElementById("confirm-btn");
    const phoneInput = document.getElementById("phone");
    const providerSelect = document.getElementById("provider");

    // Payment method selection
    methods.forEach(method => {
        method.addEventListener("click", function() {
            methods.forEach(m => m.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Validate phone number format (Ghana numbers)
    function validatePhone(phone) {
        return /^(0[2356789])[0-9]{8}$/.test(phone);
    }

    // Handle confirm button click
    confirmBtn.addEventListener("click", function() {
        const phone = phoneInput.value.trim();
        const provider = providerSelect.value;

        if (!phone) {
            alert("Please enter your mobile money number.");
            return;
        }

        if (!validatePhone(phone)) {
            alert("Please enter a valid Ghanaian phone number.");
            return;
        }

        if (!provider) {
            alert("Please select a mobile money provider.");
            return;
        }

        alert(`Payment initiated for ${phone} using ${provider.toUpperCase()}`);
    });
});
