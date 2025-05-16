import generateToken from "./generateToken";
import sendEmail from "./sendEmail";

const sendVerificationEmail = (emailID: string, userId: string) => {
    const registerToken = generateToken('verificationToken', userId, '15m');
    const context = {
        registerToken: `${registerToken}`
    }
    const template = 'verificationEmail'
    const subject = `Email Verification: ${emailID}`
    sendEmail(emailID, context, template, subject);
}

export default sendVerificationEmail;