function closePopup() {
    document.getElementById("confirmationPopup").style.display = "none";
}

function checkOrders() {
    alert("Redirecting to order history...");
    window.location.href = "orders.html"; // Update this to your actual order page
}

function confirmPayment() {
    alert("Payment confirmed successfully!");
    // You can add further logic like updating payment status or redirecting
}
