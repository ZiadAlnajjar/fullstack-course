const phoneNumberValidator = (number) => {

  const phoneNumberRegex = /^\d{2,3}-\d+$/;

  return phoneNumberRegex.test(number);
};

const message = ({ value }) => `${value} is invalid phone number. The phone number must contain digits only and ` +
'follow \'XX(X)-YYYYYY...\' format';

const validatePhoneNumber = {
  validator: phoneNumberValidator,
  message,
};

module.exports = validatePhoneNumber;
