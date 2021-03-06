// const decrypter = require("./env")
const decrypter = require('./../env_local');
const calender = require('./google_calender');

const request = require('request');

const doRequest = (options) => {
  return new Promise(function(resolve, reject) {
    request.post(options, function(error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

exports.handler = async (event, context, callback) => {
  const id = decrypter.get('calenderID');
  const cal = await calender.getCalender(id);
  return {statusCode: 200, res: cal};

  /*
  const URL = await decrypter.get('WebhookURL');

  const data = {
    url: URL,
    headers: {'Content-type': 'application/json'},
    json: {text: 'Hello World from nodejs'},
  };
  const res = await doRequest(data);

  return {statusCode: 200, res: res, cal: cal};
	*/
};
