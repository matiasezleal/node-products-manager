import nodemailer from 'nodemailer';
import { envs } from '../../config/envs';

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
        senderEmailPassword: string,
        private readonly sendEmailActive: boolean
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
        // if not active, don't send email for testing
        if( !this.sendEmailActive ) return true;
        
        const mailOptions = {
            from: envs.MAILER_EMAIL,
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