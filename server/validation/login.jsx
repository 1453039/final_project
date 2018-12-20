const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  if (typeof(data.email) == 'string') {
    data.email = !isEmpty(data.email) ? data.email : "";
    // Email checks
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  }
  if (typeof(data.password) == 'string') {
    data.password = !isEmpty(data.password) ? data.password : "";
    // Password checks
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};