const mailer = require('nodemailer');
const { welcome } = require('./welcome_template');
const {purchase} = require('./purchase_template');
require('dotenv').config();

const getEmailData = (to, name, token, template, actionData) => {
    let data = null;

    switch (template) {
        case 'welcome':
            data = {
                from: "Gigz Shop <gigzshop188@gmail.com>",
                to,
                subject: `Welcome to Gigz Store, ${name}`,
                text: "Testing Gigz Shop email",
                html: welcome()
            };
            break;

        case 'purchase':
            data = {
                from: "Gigz Shop <gigzshop188@gmail.com>",
                to,
                subject: `Thanks for shopping with us, ${name}`,
                text: "Testing Gigz Shop email",
                html: purchase(actionData)
            };
            break;

        default:
            data;
    }

    return data;
}

const sendEmail = (to, name, token, type, actionData = null) => {
    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "gigzshop188@gmail.com",
            pass: process.env.EMAIL_PASS
        }
    });

    const mail = getEmailData(to, name, token, type, actionData)

    smtpTransport.sendMail(mail, function (err, response) {
        if (err) {
            console.log(err);
        } else {
            console.log('email sent')
        }

        smtpTransport.close();
    })
}

module.exports = { sendEmail }