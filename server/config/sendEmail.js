import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resendApiKey = process.env.RESEND_API;
if (!resendApiKey) {
    console.log('provide RESEND_API in .env file');
}

const resend = new Resend(resendApiKey);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'TECHX <onboarding@resend.dev>',
            to: [sendTo],
            subject,
            html
        });

        if (error) {
            throw new Error(error.message || 'Failed to send email');
        }

        return data;
    } catch (error) {
        console.error({ error });
        throw error;
    }
};

export default sendEmail;