import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Array<{
        filename: string;
        path: string;
    }>;
}

export class EmailService {
    private readonly transporter: nodemailer.Transporter;
    constructor(
        mailerService: string,
        mailerEmail: string,
        senderEmailPassword: string
    ) {
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: senderEmailPassword
            }
        })
    }

    async sendEmail(options: EmailOptions) {
        const mailOptions = {
            from: 'noreply@example.com',
            to: options.to,
            subject: options.subject,
            html: options.htmlBody,
            attachments: options.attachments
        };

        try {
            const sent = await this.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            throw new Error('Error sending email');
        }
    }
}