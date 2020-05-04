
// const mailgun = require("mailgun-js");
// const DOMAIN = "sandboxcce4522d754440bcae3ea96f415e8667.mailgun.org";
// const mg = mailgun({apiKey: "aa2fbb55bd0911cfb324098d8ae82566-65b08458-5ee6635c", domain: DOMAIN});

// const data = {
// 	from: "Active Badge <postmaster@sandboxcce4522d754440bcae3ea96f415e8667.mailgun.org>",
// 	to: "tsemingyeungg@gmail.com",
// 	subject: "Reset password",
// 	text: "Testing some Mailgun awesomness!"
// };
// mg.messages().send(data, function (error, body) {
// 	console.log(body);
// });

module.exports = () => {
	const emailConfig = {
	  apiKey: 'aa2fbb55bd0911cfb324098d8ae82566-65b08458-5ee6635c',
	  domain: 'sandboxcce4522d754440bcae3ea96f415e8667.mailgun.org'
	};
  return emailConfig;
  };