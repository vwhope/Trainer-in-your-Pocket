const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProgramInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.trainer = !isEmpty(data.trainer) ? data.trainer : "";
  data.summary = !isEmpty(data.summary) ? data.summary : "";
  data.length = !isEmpty(data.length) ? data.length : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (validator.isEmpty(data.trainer)) {
    errors.trainer = "Trainer field is required";
  }

  if (validator.isEmpty(data.summary)) {
    errors.summary = "Summary field is required";
  }

  if (validator.isEmpty(data.length)) {
    errors.length = "Length field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
