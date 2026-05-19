import { inngest } from './client';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { ResetPasswordEmail } from '../../emails/ResetPasswordEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = inngest.createFunction(
  {
    id: 'send-password-reset-email',
    triggers: [{ event: 'app/password.password-reset' }],
  },
  async ({ event, step }) => {
    const { email, resetLink } = event.data;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const html = await render(ResetPasswordEmail({ resetLink }));

    await step.run('send-email', async () => {
      const data = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        to: email,
        subject: 'Recupera tu contraseña - Loop',
        html: html,
      });

      if (data.error) {
        throw new Error(data.error.message);
      }
      return data;
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { success: true, email };
  },
);
