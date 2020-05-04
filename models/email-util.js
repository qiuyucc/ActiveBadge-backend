const emailConfig = require('./email-config')();
const mailgun = require('mailgun-js')(emailConfig);


exports.sendEmail = (recipient, message) => {
  //new Promise((resolve, reject) => {
  const data = {
    from: 'Active Badge <postmaster@sandboxcce4522d754440bcae3ea96f415e8667.mailgun.org>',
    to: recipient,
    subject: 'Active Badge App: Reset your password',
    text: 'your code is: ' + message
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });

}