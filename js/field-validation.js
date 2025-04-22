const flags = {
  firstName_flag: false,
  lastName_flag: false,
  email_flag: false,
  phone_flag: false,
  password_flag: false,
  pinCode_flag: false,
  address_flag: false,
  cardName_flag: false,
  cardNumber_flag: false,
  cardExpiry_flag: false,
  cardCVV_flag: false
};

const fieldConfig = {
  firstName: {
    selector: 'input[name="firstName"]',
    errorSelector: '.firstName-error',
    errorMessages: {
      empty: 'First name is required',
    },
    customValidation: (value) => {
      if(/[0-9]/.test(value)) return "Name should not contain numbers";
      if (value.length < 3) return 'Enter a valid first name';
      return null;
    }
  },
  lastName: {
    selector: 'input[name="lastName"]',
    errorSelector: '.lastName-error',
    errorMessages: {
      empty: 'Last name is required',
    },
    customValidation: (value) => {
      if(/[0-9]/.test(value)) return "Name should not contain numbers";
      if (value.length < 2) return 'Enter a valid last name';
      return null;
    }
  },
  email: {
    selector: 'input[type="email"]',
    errorSelector: '.email-error',
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    errorMessages: {
      empty: 'Email is required',
      invalid: 'Enter a valid email'
    }
  },
  phone: {
    selector: 'input[name="phone"]',
    errorSelector: '.phone-error',
    regex: /^[0-9]{10}$/,
    errorMessages: {
      empty: 'Phone is required',
      invalid: 'Phone must be 10 digits'
    }
  },
  password: {
    selector: 'input[name="password"]',
    errorSelector: '.password-error',
    regex: /^.{8,}$/,
    errorMessages: {
      empty: 'Password is required',
      invalid: 'At least 8 characters required'
    },
    customValidation: (value) => {
      if (!/[A-Z]/.test(value)) return 'Must include an uppercase letter';
      if (!/[0-9]/.test(value)) return 'Must include a number';
      if (!/[@$!%*?&]/.test(value)) return 'Must include a special character';
      return null;
    }
  },
  pinCode: {
    selector: 'input[name="pinCode"]',
    errorSelector: '.pinCode-error',
    regex: /^[0-9]{6}$/,
    errorMessages: {
      empty: 'PIN code is required',
      invalid: 'PIN must be 6 digits'
    }
  },
  address: {
    selector: 'textarea[name="address"]',
    errorSelector: '.address-error',
    regex: /^.{5,}$/,
    errorMessages: {
      empty: 'Address is required',
      invalid: 'Address is too short'
    }
  },
  cardName: {
    selector: 'input[name="cardName"]',
    errorSelector: '.cardName-error',
    regex: /^[A-Za-z ]{2,}$/,
    errorMessages: {
      empty: 'Card holder name is required',
      invalid: 'Enter a valid card holder name'
    }
  },
  cardNumber: {
    selector: 'input[name="cardNumber"]',
    errorSelector: '.cardNumber-error',
    regex: /^[0-9]{16}$/,
    errorMessages: {
      empty: 'Card number is required',
      invalid: 'Card number must be 16 digits'
    },
  },
  cardExpiry: {
    selector: 'input[name="cardExpiry"]',
    errorSelector: '.cardExpiry-error',
    regex: /^(0[1-9]|1[0-2])\/\d{2}$/,
    errorMessages: {
      empty: 'Expiry date is required',
      invalid: 'Use MM/YY format',
    }
  },
  cardCVV: {
    selector: 'input[name="cardCVV"]',
    errorSelector: '.cardCVV-error',
    regex: /^[0-9]{3,4}$/,
    errorMessages: {
      empty: 'CVV is required',
      invalid: 'CVV must be 3 or 4 digits'
    }
  }
};

// Attach event listeners
Object.keys(fieldConfig).forEach((key) => {
  const config = fieldConfig[key];
  const input = document.querySelector(config.selector);
  const error = document.querySelector(config.errorSelector);

  if (input) {
    input.addEventListener('keyup', () => {
      const value = input.value.trim();

      if (value === "") {
        error.innerText = config.errorMessages.empty;
        flags[`${key}_flag`] = false;
      } 
      else if (config.regex && !config.regex.test(value)) {
        error.innerText = config.errorMessages.invalid;
        flags[`${key}_flag`] = false;
      } 
      else if (config.customValidation) {
        const customError = config.customValidation(value);
        if (customError) {
          error.innerText = customError;
          flags[`${key}_flag`] = false;
        } else {
          error.innerText = '';
          flags[`${key}_flag`] = true;
        }
      } else {
        error.innerText = '';
        flags[`${key}_flag`] = true;
      }
      // console.log('flags', flags);
      // localStorage.setItem('forms_field_flags', JSON.stringify(flags));
    });
  }
});

// **** Start password show hide functionality

var password_button = document.querySelector('.show-pass');
var password_field = document.querySelector('.password-field');

password_button.addEventListener('click', function(e) {
  e.preventDefault();
  const currentType = password_field.getAttribute('type');
  if(currentType === 'password'){
    password_field.setAttribute('type', 'text');
    password_button.innerHTML = '<i class="fa fa-eye-slash"></i>';
  } else {
    password_field.setAttribute('type', 'password');
    password_button.innerHTML = '<i class="fa fa-eye"></i>';
  }
})

// **** End password show hide functionality
