const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const dotenv = require("dotenv");
dotenv.config();




const sendMAIL = (receiver, sender, subject, msg) => {
    const msgToSend = {
        to: receiver,
        from: sender,
        subject,
        text: msg
    };

    sgMail
        .send(msgToSend)
        .then((response) => {
            console.log(response[0].statusCode);
            return response[0].statusCode;
            
        })
        .catch((error) => {
            console.log(error);
        });

}

module.exports = {
    sendMAIL
}