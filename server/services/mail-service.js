const nodemailer = require('nodemailer')


class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        })
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject: 'Activate your accaunt, boy next door' + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Click here, менчик</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
    async sendInvite(to, link) {
        await this.transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject: 'U have been invited to new calendar, BOII',
            text: '',
            html:
                `
                    <div>
                        <h1>Click here to accept invite</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService()