const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateBillDetailInput(data) {
  let errors = [];
  let isValid = true;
  for (var i in data.billDetails) {
    errors[i] = {};
    //Check Validation
    if (Validator.isEmpty(data.billDetails[i].serviceName)) {
      errors[i].serviceName = "Service name must be selected";
    }
    if (data.billDetails[i].amount <= 0) {
      errors[i].amount = "Amount must be greater than 0";
    }
    if (!isEmpty(errors[i]))
      isValid = false;
  }
  return {
    errors,
    isValid
  };
}