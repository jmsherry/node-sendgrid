require("dotenv").config();

const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;
console.log("API KEY: ", SENDGRID_API_KEY);

sgMail.setApiKey(SENDGRID_API_KEY);

const msg = {
  to: "james.sherry@thejump.tech",
  from: "test@example.com",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
//ES6
// sgMail.send(msg).then(
//   () => {},
//   (error) => {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body);
//     }
//   }
// );
//ES8
(async () => {
  try {
    const resp = await sgMail.send(msg);
    console.log('message sent', resp)
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
})();
