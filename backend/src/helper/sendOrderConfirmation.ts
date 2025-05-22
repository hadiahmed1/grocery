import sendEmail from "./sendEmail";

const sendOrderConfirmation = (emailID: string, summary: string) => {
    const context = { summary }
    const template = 'orderConfirmation'
    const subject = `Order confirmation`
    sendEmail(emailID, context, template, subject);
}

export default sendOrderConfirmation;