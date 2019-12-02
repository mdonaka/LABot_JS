const {google} = require('googleapis');
const privatekey = require('./google_key.json');
const moment = require('moment');

exports.getCalender = async (calenderID) => {
  return Promise.resolve()
  // 認証
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
  // 予定の取得
      .then(function(jwtClient) {
        return new Promise(function(resolve, reject) {
          const calendar = google.calendar('v3');
          const tomorrow = moment(moment().format('YYYY-MM-DD'))
              .utcOffset('+09:00').add(1, 'days').format();
          const tomorrowMax = moment(moment().format('YYYY-MM-DD'))
              .add(2, 'days').add(-1, 'minutes').utcOffset('+09:00').format();
          const params = {
            calendarId: calenderID,
            auth: jwtClient,
            timeMin: tomorrow, // 次の日の0:00
            timeMax: tomorrowMax, // 次の日の23:59
            singleEvents: true,
            orderBy: 'startTime',
          };
          calendar.events.list(params, (err, res) => {
            if (err) {
              console.log('The API returned an error: ' + err);
              reject(err);
            }
            resolve(res.data.items);
          });
        });
      })
      .then(function(result) {
        return result;
        // callback(null, result);
      })
      .catch(function(err) {
        return err;
      });
};

