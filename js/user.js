const api_url = 'https://fakestoreapi.com';
let fetch_local_user = JSON.parse(localStorage.getItem('users')) || [];

let email = document.getElementById('email');
let password = document.getElementById('password');

const success_class = 'success_msg';

// Check the login state from localStorage
let checkLogged = localStorage.getItem('checkLogged') === 'true';

window.addEventListener('load', function () {
    // If no users are stored in localStorage, fetch from API
    if (fetch_local_user.length === 0) {
        get_user();
    }
});

// Fetch all users
async function get_user() {
	try {
        const response = await fetch(`${api_url}/users`);
        if (!response.ok) throw new Error('Failed to fetch users');
        const users = await response.json();
        // Store the fetched users in localStorage
        localStorage.setItem('users', JSON.stringify(users));
        // Update the fetch_local_user variable with the new users
        fetch_local_user = users;
	} catch (err) {
		console.error('Error fetching users:', err);
	}
	console.log('fetch_local_user', fetch_local_user)
}

// Login functionality
function log_user() {

    // Get the message element
    const messageElement = document.getElementById('login_error');

    // Clear any existing messages
    messageElement.innerText = '';
    messageElement.classList.remove(success_class);

    // Validate form fields
    if (!email.value || !password.value) {
        messageElement.innerText = 'All fields are required.';
        return;
    }

    // Check if users are available
    if (fetch_local_user.length === 0) {
        messageElement.innerText = 'User data not available. Try again later.';
        return;
    }

    const userIndex = fetch_local_user.findIndex(user => user.email === email.value && user.password === password.value);

    // Validate email and password
    if (fetch_local_user.some(user => user.email === email.value && user.password === password.value)) {

        document.querySelector('#login_submit').classList.add('loading');

		setTimeout(function() {
            checkLogged = true;
            localStorage.setItem('checkLogged', checkLogged);
            localStorage.setItem('storeUserIndex', userIndex);
            messageElement.innerText = 'Login successful';
            
            messageElement.classList.add('success_msg');
            document.getElementById("loginForm").reset();
            document.querySelector('#login_submit').classList.remove('loading');
		}, 2000);

		setTimeout(function() {
            window.location.href = `${absolutePath}/index.html`;
		}, 3000);

    } else {
        checkLogged = false;
        messageElement.innerText = 'Email and password not matching';
    }
}

function login_func(e) {
    e.preventDefault();
    log_user();
}
