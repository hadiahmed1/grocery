import nodemailer from 'nodemailer'
import hbs from "nodemailer-express-handlebars";

const sendEmail = (emailID: string, context: object, template: string, subject: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "hadiahmed0112@gmail.com",
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

    const mailConfigurations = {
        from: 'hadiahmed0112@gmail.com',
        to: `${emailID}`,
        subject,
        template,
        context
    };

    transporter.sendMail(mailConfigurations, function (error) {
        if (error) {
            console.log(error);
        }
        console.log('Email Sent Successfully');
    });
}
export default sendEmail;