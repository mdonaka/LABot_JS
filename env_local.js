require('dotenv').config();
const env = process.env;

exports.get = (key) => {
  if (env[key]) {
    return env[key];
  }
  return -1;
};
