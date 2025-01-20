// Fetching getUserDetails and the submitted user index (getDetails) from header_footer.js file

// *** Start to display data on profile
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");

// start showing data in input
firstname.value = getUserDetails[getDetails].name.firstname;
lastname.value = getUserDetails[getDetails].name.lastname;
email.value = getUserDetails[getDetails].email;
phone.value = getUserDetails[getDetails].phone;
password.value = getUserDetails[getDetails].password;
// End showing data in input

// start to backup my old data
const old_firstname = getUserDetails[getDetails].name.firstname;
const old_lastname = getUserDetails[getDetails].name.lastname;
const old_email = getUserDetails[getDetails].email;
const old_phone = getUserDetails[getDetails].phone;
const old_password = getUserDetails[getDetails].password;
// end to backup my old data

// *** End to display data on profile

// *** starting edit functionality

document
  .getElementById("profileEditBtn")
  .addEventListener("click", function () {
    const inputs = document.querySelectorAll("#profileForm input");

    inputs.forEach((input) => {
      input.removeAttribute("readonly");
    });

    // rendering submit button on edit button click
    document.getElementById("profileSubmitWrap").innerHTML = `
        <button class="cmnBtn" type="submit" id="profileSubmitBtn">Submit <span class="spinner-border"></span></button>
        <button class="cmnBtn greyBtn" id="profileCancelBtn">Cancel</button>
        <p id="profile_error" class="error_msg success_msg"></p>
    `;
    const profileSubmitBtn = document.getElementById("profileSubmitBtn");
    const profileCancelBtn = document.getElementById("profileCancelBtn");

    // Start profile cancel button functionality
    profileCancelBtn.addEventListener("click", function (e) {
      firstname.value = old_firstname;
      lastname.value = old_lastname;
      email.value = old_email;
      phone.value = old_phone;
      password.value = old_password;

      inputs.forEach((input) => {
        input.setAttribute("readonly", true);
      });

      document.getElementById("profileSubmitWrap").innerHTML = " ";
    });
    // End profile cancel button functionality

    // Start profile submit button functionality
    profileSubmitBtn.addEventListener("click", function (e) {
      e.preventDefault();
        
      profileSubmitBtn.classList.add("loading");

      // Check if email or password has changed.
      if (email.value !== old_email || password.value !== old_password) {
        // Show confirmation dialog for critical changes.
        if (!confirm("Are you sure you want to change email or password?")) {
          profileSubmitBtn.classList.remove("loading");
          return; // Exit without saving.
        } else {
          setTimeout(function () {
            localStorage.setItem('checkLogged', false);
            localStorage.setItem('storeUserIndex', null);
            window.location.href = `${absolutePath}/login.html`;
          }, 3000);
        }
      }

      // Save the data to localStorage only if user confirms.
      getUserDetails[getDetails].name.firstname = firstname.value;
      getUserDetails[getDetails].name.lastname = lastname.value;
      getUserDetails[getDetails].email = email.value;
      getUserDetails[getDetails].phone = phone.value;
      getUserDetails[getDetails].password = password.value;
      getUserDetails[
        getDetails
      ].username = `${firstname.value} ${lastname.value}`;

      setTimeout(function () {
        // Update localStorage with updated details.
        localStorage.setItem("users", JSON.stringify(getUserDetails));

        document.getElementById("profile-dropdown").innerText = firstname.value;
        document.getElementById("profile_error").innerText = 'Profile Updated';
        profileSubmitBtn.classList.remove("loading");

        inputs.forEach((input) => {
          input.setAttribute("readonly", true);
        });

        document.getElementById("profileSubmitWrap").innerHTML = " ";

      }, 1500);

    });

    // End profile submit button functionality
  });
