import react from 'react';

const validateCredentials = (username, password) => {
    const containsWhitespace = /\s/;
    
    if (
      username.length < 6 || 
      password.length < 8 || 
      containsWhitespace.test(username) || 
      containsWhitespace.test(password)
    ) {
      console.log("Invalid credentials. Please enter a valid username and password with no spaces.");
      return false;
    }
  
    console.log("Credentials are valid");
    return true;
  };

const passwordValidator = ( passowrds ) => {
    const containsNumber = /\d/;
    const containsUpperCase = /[A-Z]/;
    const containsLowerCase = /[a-z]/;
    const containsSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  
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
      passowrds.oldPassword.length < 8 || 
      !containsNumber.test(passowrds.oldPassword) || 
      !containsUpperCase.test(passowrds.oldPassword) || 
      !containsLowerCase.test(passowrds.oldPassword) || 
      !containsSpecialCharacter.test(passowrds.oldPassword)
    ) {
      console.log("Invalid password. Please enter a valid password with at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
      return {
        valid: false,
        message: "Invalid password. Please enter a valid password with at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      }
    }
  
    console.log("Password is valid");
    return {
      valid: true,
      message: "Password is valid"
    };
}

export { validateCredentials, passwordValidator };
