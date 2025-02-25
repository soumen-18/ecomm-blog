const steps = document.querySelectorAll('.checkout-stepper');
const card_details = document.getElementById('card-details');
const prev_btn = document.getElementById('prev-btn');
const next_btn = document.getElementById('next-btn');
const cash_on_delivery = document.getElementById('on-cash');
const card_payment = document.getElementById('card-pay');
const first_step_required_field = document.querySelectorAll("#first-step input, #first-step textarea");
const second_step_required_field = document.querySelectorAll("#second-step input, #second-step textarea");

var currentStep = 0;

function showStep(stepIndex) {
    steps.forEach((step, index) => {
        step.classList.toggle('d-none', index !== stepIndex);
    });

    prev_btn.classList.toggle('d-none', stepIndex === 0);
    next_btn.innerText = stepIndex === steps.length - 1 ? "Submit" : "Next";
}

// Checking if all required fields are filled
function validateStep() {
    if (currentStep === 0) { 
        for (let input of first_step_required_field) {
            if (input.value.trim() === "") {
                alert("Please fill out all fields before proceeding.");
                return false;
            }
        }
    } 
    return true;
}

// Next button functionality
next_btn.addEventListener('click', function(e) {
    e.preventDefault();

    if (!validateStep()) return;

    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Form submitted successfully!");
    }
});

// Prev button functionality
prev_btn.addEventListener('click', function(e) {
    e.preventDefault();

    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
});

// Payment method selection functionality
cash_on_delivery.addEventListener('change', function() {
    card_details.classList.add('d-none'); 
    alert("You selected Cash on Delivery. Payment will be collected at the time of delivery.");
});

card_payment.addEventListener('change', function() {
    card_details.classList.remove('d-none');
});

// Initialize First Step
showStep(currentStep);
