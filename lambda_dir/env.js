const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const env = [];

exports.get = async (key) => {
  if (!env[key]) {
    // Decrypt code should run once and variables stored outside of the function
    // handler so that these are decrypted once per container
    const kms = new AWS.KMS();

    try {
      const params = {CiphertextBlob: new Buffer(process.env[key], 'base64')};
      const data = await kms.decrypt(params).promise();
      env[key] = data.Plaintext.toString('ascii');
    } catch (err) {
      console.log('Decrypt error:', err);
    }
  }
  return env[key];
};
