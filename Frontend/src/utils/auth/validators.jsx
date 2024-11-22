import react from 'react';

const passwordValidator = ( passowrds ) => {
  const containsNumber = /\d/;
  const containsUpperCase = /[A-Z]/;
  const containsLowerCase = /[a-z]/;
  const containsSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const containsWhitespace = /\s/;

  if (!passowrds.oldPassword || !passowrds.newPassword || !passowrds.confirmPassword) {
    return {
      valid: false,
      message: "All fields are required."
    };
  }

  if (passowrds.newPassword !== passowrds.confirmPassword) {
      return {
        valid: false,
        message: "Passwords do not match."
      };
  }

  if (
    passowrds.newPassword.length < 8 || 
    !containsNumber.test(passowrds.newPassword) || 
    !containsUpperCase.test(passowrds.newPassword) || 
    !containsLowerCase.test(passowrds.newPassword) || 
    !containsSpecialCharacter.test(passowrds.newPassword) || 
    containsWhitespace.test(passowrds.newPassword)
  ) {
    console.log("Invalid password. Please enter a valid password with at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
    return {
      valid: false,
      message: "Invalid password. Please enter a valid password with at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
    }
  }

  return {
    valid: true,
    message: "your password was updated successfully."
  };
}

const validateCredentials = (formData) => {
  const containsWhitespace = /\s/;
  const containsNumber = /\d/;
  const containsUpperCase = /[A-Z]/;
  const containsLowerCase = /[a-z]/;
  const containsSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  
  if (!formData.username || !formData.password || !formData.email || !formData.password2) {
    console.log(formData);
    return {
      valid: false,
      message: "All fields are required."
    };
  }
  
  if (formData.username.length < 6 || containsWhitespace.test(formData.username))
    {
      return {
        valid: false,
        message: "username cannot be less than 6 characters. or contain whitespace"
      }
  }
  
  
  if (formData.password !== formData.password2) {
        return {
          valid: false,
          message: "Passwords do not match."
        };
  }
  
  if (
    formData.password.length < 8 || 
    !containsNumber.test(formData.password) || 
    !containsUpperCase.test(formData.password) || 
    !containsLowerCase.test(formData.password) || 
    !containsSpecialCharacter.test(formData.password) || 
    containsWhitespace.test(formData.password)
  ) {
      console.log("Invalid password. Please enter a valid password with at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
      return {
        valid: false,
        message: "Invalid password. Please enter a valid password with at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      }
    }
  
    return {
      valid: true,
      message: "Account created successfully."
    }
  };



export { validateCredentials, passwordValidator };
