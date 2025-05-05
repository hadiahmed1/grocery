import nodemailer from 'nodemailer'
import generateToken from './generateToken';

import hbs from "nodemailer-express-handlebars";


const sendEmail = (emailID: string, userId: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "hadi@itobuz.com",
            pass: process.env.EMAIL_PASSWORD
        }
    });
    transporter.use('compile', hbs({
        viewEngine: {
            extname: '.hbs',
            layoutsDir: './src/views',
            defaultLayout: false,
            partialsDir: './src/views',
        },
        viewPath: './src/views',
        extName: '.hbs'
    }));
    const registerToken = generateToken('registrationToken', userId, '15m');

    const mailConfigurations = {
        from: 'hadi@itobuz.com',
        to: `${emailID}`,//replace with ${emailID}
        subject: `Email Verification: ${emailID}`,
        template: 'verificationEmail',
        context: {
            registerToken: `${registerToken}`
        }
    };

    transporter.sendMail(mailConfigurations, function (error) {
        if (error) throw Error();
        console.log('Email Sent Successfully');
    });
}
export default sendEmail;