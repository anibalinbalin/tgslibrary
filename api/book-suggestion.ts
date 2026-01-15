import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bookTitle } = req.body;

    if (!bookTitle || typeof bookTitle !== 'string') {
      return res.status(400).json({ error: 'Book title is required' });
    }

    // Send email notification
    const { data, error } = await resend.emails.send({
      from: 'Library <onboarding@resend.dev>',
      to: 'michelletheresaliu@gmail.com',
      subject: `New Book Suggestion: ${bookTitle}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; margin-bottom: 16px;">New Book Suggestion!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Someone suggested a new book for your library:
          </p>
          <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="color: #333; font-size: 18px; font-weight: 500; margin: 0;">
              "${bookTitle}"
            </p>
          </div>
          <p style="color: #999; font-size: 14px; margin-top: 24px;">
            Submitted via liumichelle.com/library
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
