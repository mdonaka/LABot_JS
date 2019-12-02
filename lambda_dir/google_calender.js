const {google} = require('googleapis');
const privatekey = require('./google_key.json');

exports.getCalender = async () => {
  return Promise.resolve()
      .then(function() {
        return new Promise(function(resolve, reject) {
          // JWT auth clientの設定
          const jwtClient = new google.auth.JWT(
              privatekey.client_email,
              null,
              privatekey.private_key,
              ['https://www.googleapis.com/auth/calendar']);
          // authenticate request
          jwtClient.authorize(function(err, tokens) {
            if (err) {
              reject(err);
            } else {
              console.log('認証成功');
              resolve(jwtClient);
            }
          });
        });
      })
      .then(function(jwtClient) {
        return new Promise(function(resolve, reject) {
          const calendar = google.calendar('v3');
          calendar.calendarList.list({
            auth: jwtClient,
          }, function(err, response) {
            if (err) {
              reject(err);
            } else {
              resolve(response.data.items);
            }
          });
        });
      })
      .then(function(result) {
        return result;
        // callback(null, result);
      })
      .catch(function(err) {
        // callback(err);
      });
};

