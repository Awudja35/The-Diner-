document.addEventListener("DOMContentLoaded", function () {
    const emailDisplay = document.getElementById("user-email");
    const verificationMessage = document.getElementById("verification-message");
    const submitButton = document.getElementById("submit-btn");
    const otpInputs = document.querySelectorAll(".code-input input");

    // Fetch email from local storage
    let userEmail = localStorage.getItem("userEmail") || null;

    if (userEmail) {
        emailDisplay.textContent = userEmail;
        verificationMessage.style.display = "block"; // Show verification section
    } else {
        verificationMessage.style.display = "none"; // Hide if no email is found
    }

    // Change Email Function
    document.getElementById("change-email").addEventListener("click", function () {
        let newEmail = prompt("Enter your email:");
        if (newEmail) {
            localStorage.setItem("userEmail", newEmail);
            emailDisplay.textContent = newEmail;
            verificationMessage.style.display = "block";
        }
    });

    // Countdown Timer
    let countdownElement = document.getElementById("countdown-timer");
    let timeLeft = 299; // 4:59 in seconds

    function updateTimer() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        countdownElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        
        if (timeLeft > 0) {
            timeLeft--;
            setTimeout(updateTimer, 1000);
        } else {
            countdownElement.textContent = "Code expired";
        }
    }
    updateTimer();

    // Resend Code Functionality
    document.getElementById("resend-code").addEventListener("click", function () {
        alert("Verification code has been resent!");
        timeLeft = 299; // Restart countdown timer
        updateTimer();
    });

    // Disable submit button after clicking
    submitButton.addEventListener("click", function () {
        let isFilled = true;
        
        otpInputs.forEach(input => {
            if (input.value.trim() === "") {
                isFilled = false;
            }
        });

        if (isFilled) {
            submitButton.classList.add("disabled");
            submitButton.textContent = "Processing...";
            submitButton.disabled = true;

            setTimeout(() => {
                alert("Code Submitted Successfully!");
                submitButton.textContent = "Submit";
                submitButton.classList.remove("disabled");
                submitButton.disabled = false;
            }, 3000);
        } else {
            alert("Please enter all digits of the code!");
        }
    });
});
