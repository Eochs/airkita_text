var twilioClient = require('../twilioClient');
var fs = require('fs');
var admins = require('../config/administrators.json');

function formatMessage(airToReport) {
  return '\n🐕 Bark! Bark! 🐕 \nAirkita says: Danger! Air quality is reaching dangerous levels!' +
    'ppm: ' + airToReport;
};

exports.notifyOnError = function(appError, request, response, next) {
  admins.forEach(function(admin) {
    var messageToSend = formatMessage(appError.message);
    twilioClient.sendSms(admin.phoneNumber, messageToSend);
  });
  next(appError);
};
