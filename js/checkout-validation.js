// const submit_cart_product = JSON.parse(localStorage.getItem('cart')) || [];
const steps = document.querySelectorAll('.checkout-stepper');
const card_details = document.getElementById('card-details');
const prev_btn = document.getElementById('prev-btn');
const next_btn = document.getElementById('next-btn');
const cash_on_delivery = document.getElementById('on-cash');
const card_payment = document.getElementById('card-pay');
const first_step_required_field = document.querySelectorAll("#first-step input, #first-step textarea");
const payment_options = document.querySelectorAll("#payment-options input");
const card_required_fields = document.querySelectorAll("#card-details input");
let submitted_details;


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
    else if (currentStep === 1) { 
        let selectedPayment = document.querySelector('input[name="payment-option"]:checked');
        
        if (!selectedPayment) {
            alert("Please choose a payment option.");
            return false;
        }

        if (selectedPayment.value === "Credit/Debit Card") {
            for (let input of card_required_fields) {
                if (input.value.trim() === "") {
                    alert("Please fill out all card details.");
                    return false;
                }
            }
        }
    } 
    return true;
}

// Saved User details
function saveUserDetails() {
    let selectedPayment = document.querySelector('input[name="payment-option"]:checked')?.value || null;

    let newAddress = [{
        date: currentDate, //fetch current date from index.js
        order_id: Math.floor(1000000000 + Math.random() * 9000000000),
        name: document.getElementById('firstname').value + ' ' + document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        pin: document.getElementById('pin_code').value,
        address: document.getElementById('address').value,
        payment: {
            cash: selectedPayment === "Cash on Delivery" ? true : null,
            card: selectedPayment === "Credit/Debit Card" ? {
                name: document.getElementById('card-holder-name').value,
                number: document.getElementById('card-number').value,
                cvv: document.getElementById('cvv').value,
                exp_date: document.getElementById('expiry-date').value
            } : null
        }
    }];

    let storedAddress = JSON.parse(localStorage.getItem('address')) || [];

    submitted_details = newAddress;

    storedAddress.push(...newAddress);

    localStorage.setItem('address', JSON.stringify(storedAddress));
    console.log(JSON.parse(localStorage.getItem('address')))
}

// Submit all details
function submitData() {
    let order = [];
    let newOrder = { ...submitted_details[0], price: save_total_price, order_items: fetch_final_product };
    order.push(newOrder);

    localStorage.setItem('final_order', JSON.stringify(order));

    localStorage.setItem('cart', JSON.stringify([]));

    setTimeout(function() {
        window.location.href = `${absolutePath}/order.html`;
    }, 3000);
}

// Next button functionality
next_btn.addEventListener('click', function(e) {
    e.preventDefault();

    if (!validateStep()) return;

    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    } else {
        saveUserDetails();
        submitData();
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
