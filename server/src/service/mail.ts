import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

class MailService {
  transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },

    } as SMTPTransport.Options)
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Account activation on ' + process.env.API_URL,
      text: '',
      html:
        `
          <div>
            <h1>To activate your account follow the link</h1>
            <a href='${link}'>${link}</a>
          </div>
          `,
    })
  }

  async sendEmailFromContactForm(from: string, name: string, message: string, subject?: string) {
    try{
      await this.transporter.sendMail({
        from,
        to: process.env.PERSONAL_EMAIL,
        subject: subject,
        text: '',
        html:
          `
          <div>
          <h2>This email is received from contact form on https://akaralevich.netlify.app</h2>
          <h4>Author: ${name}</h4>
          <h4>Email: ${from}</h4>
              ${message}
          </div>
          `,
      })

      await this.transporter.sendMail({
        to: from,
        subject: 'Auto-reply: Thank you for contacting me',
        text: '',
        html:
          `
          <div>
          <h4>Hi ${name}</h4>
              Thank you for contacting me. This email is to confirm that I have received your message. I will get back
               to you as soon as possible. Please note that this is an automated response. If you have any urgent 
               inquiries, please contact me directly at 
               <a href='mailto:karalevichandrei@gmail.com' target='_blank'>karalevichandrei@gmail.com</a>.
          </div>
          `,
      })
    }catch (e){
      throw new Error('Something went wrong')
    }

  }
}

export default new MailService()