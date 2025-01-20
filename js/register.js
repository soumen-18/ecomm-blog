const api_url = 'https://fakestoreapi.com';
let fetch_local_user = JSON.parse(localStorage.getItem('users'))  || [];
const error_class = 'error_msg';
const success_class = 'success_msg';

const submitButton = document.querySelector("#registerForm button[type='submit']");

// Only fetch and store users if localStorage is empty
async function get_user() {
    if (fetch_local_user.length === 0) {
        try {
            const response = await fetch(`${api_url}/users`);
            if (!response.ok) throw new Error('Failed to fetch users');
            const users = await response.json();
            localStorage.setItem('users', JSON.stringify(users));
            fetch_local_user = users; // Update fetch_local_user after fetching from API
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    }
}

// Call get_user only once on page load
window.addEventListener('load', function () {
    get_user();
});

function loadingButtonState(button, isLoading, btnLoading = 'loading') {
    if(isLoading){
        button.classList.add(btnLoading);
        button.disabled = true;
    } else {
        button.classList.remove(btnLoading);
        button.disabled = false;
    }
}

async function register_func(e) {
    e.preventDefault();

    loadingButtonState(submitButton, true);

    // Collect form data inside the function
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();

    const regError = document.getElementById("reg_error");
    regError.textContent = ""; // Clear previous messages

    // Validate input fields
    if (!email || !password || !firstname || !lastname || !phone) {
        regError.textContent = "All fields are required.";
        loadingButtonState(submitButton, false);
        regError.classList.remove(success_class);
        return;
    }

    if(fetch_local_user.some(user => user.email === email)) {
        regError.textContent = "Email already exists.";
        loadingButtonState(submitButton, false);
        regError.classList.remove(success_class);
        return;
    } else if(fetch_local_user.some(user => user.phone === phone)) {
        regError.textContent = "phone number already exists.";
        loadingButtonState(submitButton, false);
        regError.classList.remove(success_class);
        return;
    }
    const userData = {
        email: email,
        username: `${firstname} ${lastname}`,
        password: password,
        name: {
            firstname: firstname,
            lastname: lastname,
        },
        address: {
            city: 'Kolkata',
            street: 'Heaven',
            number: 12895,
            zipcode: '711401',
            geolocation: {
                lat: "-37.3159",
                long: "81.1496",
            },
        },
        phone: phone,
    };

    try {
        const response = await fetch(`${api_url}/users`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const result = await response.json();

        if (response.ok) {
            fetch_local_user.push(userData);
            localStorage.setItem('users', JSON.stringify(fetch_local_user));

            regError.textContent = "User created successfully!";
            regError.classList.add(success_class);

            document.getElementById("registerForm").reset();
            loadingButtonState(submitButton, false);

            setTimeout(function() {
                window.location.href = `${absolutePath}/login.html`;
            }, 2000);

        } else {
            regError.textContent = "Failed to create user.";
            loadingButtonState(submitButton, false);
            regError.classList.remove(success_class);
        }
    } catch (error) {
        regError.textContent = "An error occurred.";
        regError.classList.remove(success_class);
        console.error("Fetch Error:", error);
    }
}

// Attach the event listener properly
document.getElementById("registerForm").addEventListener("submit", register_func);
