const { body, validationResult } = require("express-validator");

// appointment validation
const validateAppointment = [
  body("visitor").notEmpty().withMessage("Visitor is required"),
  body("date").notEmpty().withMessage("Date is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// auth validation
const validateRegister = [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateAppointment,
  validateRegister,
};