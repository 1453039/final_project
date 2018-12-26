const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  if (typeof(data.name) == "string") {
    data.name = !isEmpty(data.name) ? data.name : "";
    // Name checks
    if (Validator.isEmpty(data.name)) {
      errors.name = "Name field is required";
    }
  }

  if (typeof(data.email) == "string") {
    data.email = !isEmpty(data.email) ? data.email : "";
    // Email checks
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  }

  if (typeof(data.oldPassword) == "string") {
    data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : "";
    if (Validator.isEmpty(data.oldPassword)) {
      errors.oldPassword = "Password field is required";
    }
  }

  if (typeof(data.password) == "string" && typeof(data.password2) == "string") {
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    // Password checks
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
      errors.password2 = "Confirm password field is required";
    }
    else if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "Confirm passwords must match";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};