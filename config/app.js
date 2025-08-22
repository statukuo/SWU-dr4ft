const joi = require("joi");

const envVarsSchema = joi.object({
  PORT: joi.number()
    .default(1337),
  HOST: joi.string()
    .default("localhost"),
  DEFAULT_USERNAME: joi.string()
    .default("dr4fter"),
  LOG_PATH: joi.string()
    .default("log")
}).unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
module.exports = envVars;
