require("dotenv").config();
const express = require("express");
const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY = "", PORT = 3000 } = process.env;
console.log("API KEY: ", SENDGRID_API_KEY);

sgMail.setApiKey(SENDGRID_API_KEY);

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.post("/api/v1/email", async (req, res) => {
  console.log(req.body);

  const {from, to, subject, message} = req.body;

  // {
  //   from: 'james.m.sherry@googlemail.com',
  //   to: 'james.sherry@thejump.tech',
  //   subject: 'subject test',
  //   message: 'asdfasd\n\nasdfsad'
  // }

  const msg = {
  to,
  from,
  subject,
  text: message,
  html: `<div>${message}</div>`,
};

  // return res.sendStatus(200);
  try {
      const resp = await sgMail.send(msg);
      console.log('message sent', resp)
      return res.status(201).send(resp);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error')
      // if (error.response) {
      //   console.error(error.response.body);
      // }
    }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

// const msg = {
//   to: "james.sherry@thejump.tech",
//   from: "test@example.com",
//   subject: "Sending with Twilio SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
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
// (async () => {
//   try {
//     const resp = await sgMail.send(msg);
//     console.log('message sent', resp)
//   } catch (error) {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body);
//     }
//   }
// })();
