const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAddBillInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.flatName = !isEmpty(data.flatName) ? data.flatName : "";
  //Check Validation
  if (Validator.isEmpty(data.flatName)) {
    errors.flatName = "Flat name field is required";
  }
  if (data.month <= 0 || data.month > 12) {
    errors.month = "Month must be between 1 and 12";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}