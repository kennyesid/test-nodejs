const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const jwt = require("jsonwebtoken");

const ajv = new Ajv();
addFormats(ajv);

const userSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    type: { type: "string" },
    password: { type: "string", minLength: 4 },
  },
  required: ["name", "email", "type", "password"],
  additionalProperties: false,
};

const validateUser = (req, res, next) => {
  const validate = ajv.compile(userSchema);
  const valid = validate(req.body);

  if (!valid) {
    return res.status(400).json({
      error: "Error de validación",
      details: validate.errors,
    });
  }

  next();
};

const generateToken = (user) => {
  const payload = { id: user._id, type: user.type };
  return jwt.sign(payload, "secret_key", { expiresIn: "1h" });
};

module.exports = { validateUser, generateToken };
