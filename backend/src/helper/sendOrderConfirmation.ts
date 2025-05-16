import sendEmail from "./sendEmail";

const sendOrderConfirmation = (emailID: string, time: string) => {
    const context = { time }
    const template = 'orderConfirmation'
    const subject = `Order confirmation`
    sendEmail(emailID, context, template, subject);
}

export default sendOrderConfirmation;